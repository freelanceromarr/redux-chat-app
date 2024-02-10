import { apiSlice } from "../apiSlice";


export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        // endpoints are here;
        getConversations: builder.query({
            query: (email)=>`conversations/?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_PAGELIMIT}`
        })
    })
})


export const {useGetConversationsQuery} = conversationApi;