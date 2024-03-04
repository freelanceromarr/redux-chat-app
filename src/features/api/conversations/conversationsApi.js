import { apiSlice } from "../apiSlice";
import { messagesApi } from "../messages/messagesApi";
import io from 'socket.io-client';

const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints are here;
    getConversations: builder.query({
      query: (email) =>
        `conversations/?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_PAGELIMIT}`,
        async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}){
          //create socke
          const socket = io('http://localhost:9000', {
            reconnectionDelay: 10000, 
            reconnection: true,
            reconnectionAttempts:10,
            transports: ["websocket"],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false,
          });
          //listener
          try {
            await cacheDataLoaded;
            socket.on('conversation', (data) =>{
            const {data:conversation}= data || {};
            console.log(data);
              updateCachedData((draft)=>{
                draft.find(con=>{
                  if (con.id == conversation.id) {
                    con.message = conversation.message;
                    con.timestamp = conversation.timestamp
                  }
                })
              })

            })
          } catch (error) {
            await cacheEntryRemoved;
            socket.close();
            console.log(error.message);
          }
        }
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations/?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    }),
    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic cache update
        try {
          const { data: conversation } = await queryFulfilled;
          if (conversation?.id) {
            const users = arg.data?.users;
            const senderUser = users.find(
              (user) => user.email === arg.sender.email
            );
            const receiveUser = users.find(
              (user) => user.email !== arg.sender.email
            );
            const res = await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.id,
                sender: senderUser,
                receiver: receiveUser,
                message: arg.data?.message,
                timestamp: arg.data?.timestamp,
              })
            ).unwrap();
            //cache update after conversation add
            if (res?.conversationId) {
              dispatch(
                apiSlice.util.updateQueryData(
                  "getConversations",
                  arg?.sender.email,
                  (draft) => {
                    draft.push(conversation);
                  }
                )
              )
            }
            
          }
        } catch (error) {
        //nothing to show
        }
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, data, sender }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimiistic cache update
        const updatedConversation = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg.sender.email,
            (draft) => {
              const draftConversation = draft.find((con) => con.id == arg.id);
              draftConversation.message = arg.data.message;
              draftConversation.timestamp = arg.data.timestamp;
            }
          )
        );
        try {
          const { data: conversation } = await queryFulfilled;
          if (conversation?.id) {
            //soft entry to message

            const users = arg.data?.users;
            const senderUser = users?.find(
              (u) => u.email === arg.sender.email
            );
            const receiveUser = users.find(
              (user) => user.email !== arg.sender.email
            );
            const res = await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.id,
                sender: senderUser,
                receiver: receiveUser,
                message: arg.data?.message,
                timestamp: arg.data?.timestamp,
              })
            ).unwrap();
            //cache update
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                res?.conversationId.toString(),
                (draft) => {
                  draft.push(res);
                }
              )
            );
          }
        } catch (err) {
          updatedConversation.undo();
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationApi;
export default conversationApi;
