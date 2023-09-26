import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import messageReducer from "./msg";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
