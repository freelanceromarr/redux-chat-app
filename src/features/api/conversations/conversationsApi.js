import { apiSlice } from "../apiSlice";
import { messagesApi } from "../messages/messagesApi";

const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints are here;
    getConversations: builder.query({
      query: (email) =>
        `conversations/?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_PAGELIMIT}`,
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
        const { data: conversation } = await queryFulfilled;
        console.log(conversation);
        const { sender: messageSender, data } = arg || {};
        dispatch(
          messagesApi.endpoints.addMessage.initiate({
            conversationId: conversation?.id,
            sender: messageSender,
            receiver: data?.users?.find(
              (user) => user.email !== messageSender.email
            ),
            message: data?.message,
            timestamp: data?.timestamp,
          })
        );
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, data, sender }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {

        
        const { data: conversation } = await queryFulfilled;
        const { sender: messageSender, data } = arg || {};
        dispatch(
          messagesApi.endpoints.addMessage.initiate({
            conversationId: conversation?.id,
            sender: messageSender,
            receiver: data?.users?.find(
              (user) => user.email !== messageSender.email
            ),
            message: data?.message,
            timestamp: data?.timestamp,
          })
        );
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
