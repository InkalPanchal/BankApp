import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;

// import { combineReducers } from "redux";

// const SET_MSG = "SET_MSG";
// const CLEAR_MSG = "CLEAR_MSG";

// export const setMsg = (msg) => {
//   return {
//     type: SET_MSG,
//     msg,
//   };
// };
// export const clearMsg = (msg) => {
//   return {
//     type: CLEAR_MSG,
//     msg,
//   };
// };

// const message = (state, action) => {
//   switch (action.type) {
//     case "SET_MSG":
//       return { ...state, msg: action.token };
//     case "CLEAR_MSG":
//       return { ...state, msg: null };
//     default:
//       return state;
//   }
// };
// const msgStore = combineReducers({ message });
// export default msgStore;
