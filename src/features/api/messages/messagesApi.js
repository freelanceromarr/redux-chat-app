import { apiSlice } from "../apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints are here
    getMessages: builder.query({
      query: (id) =>`/messages/?conversationId=${id}&_sort=timestamp&_order=desc&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
    }),
  }),
});

export const {useGetMessagesQuery} = messagesApi
