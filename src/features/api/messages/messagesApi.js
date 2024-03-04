import { apiSlice } from "../apiSlice";
import io from 'socket.io-client'

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints are here
    getMessages: builder.query({
      query: (id) =>`/messages/?conversationId=${id}&_sort=timestamp&_order=desc&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
      async onCacheEntryAdded(arg, {cacheDataLoaded, updateCachedData, cacheEntryRemoved}){
        const socket = io('http://localhost:9000', {
            reconnectionDelay: 10000, 
            reconnection: true,
            reconnectionAttempts:10,
            transports: ["websocket"],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false,
          });
        try {
          await cacheDataLoaded;
          socket.on('message', (data) =>{
            const {data:message}= data || {};
            const {conversationId} = message;
            console.log(conversationId, arg.id);
              if (conversationId){ 
                updateCachedData((draft)=>{
                      draft.push(message)
                })
              }
              })
        } catch (error) {
          console.log(error.message);
        }
      }
    }),
    addMessage: builder.mutation({
      query: (data)=>({
        url: "/messages",
        method: "POST",
        body: data
      })
    })
  }),
});

export const {useGetMessagesQuery, useAddMessageMutation} = messagesApi
