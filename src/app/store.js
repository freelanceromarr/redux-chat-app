import { configureStore } from '@reduxjs/toolkit';
import {apiSlice} from "../features/api/apiSlice";
import authReducer from "../features/api/auth/authSlice"
import conversationsReducer from "../features/api/conversations/conversationsSlice"
import messagesReducer from "../features/api/messages/messagesSlice"


export const store = configureStore({
  reducer: {
   [apiSlice.reducerPath]: apiSlice.reducer,
   auth: authReducer,
   conversations: conversationsReducer, 
   messages: messagesReducer
  },
  devTools: true,
  middleware: (getDefaltMiddlewares)=>{
    return getDefaltMiddlewares().concat(apiSlice.middleware)
  }
});


