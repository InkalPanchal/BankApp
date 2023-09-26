import { combineReducers } from "redux";
const SET_TOKEN = "SET_TOKEN";
const CLEAR_TOKEN = "CLEAR_TOKEN";
const defaultToken = {
  token: null,
};

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  };
};
export const clearToken = (token) => {
  return {
    type: CLEAR_TOKEN,
    token,
  };
};

const token = (state = defaultToken, action) => {
  // console.log("token.js state", state);
  // console.log("token.js action", action);

  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.token };
    case "CLEAR_TOKEN":
      return { ...state, token: null };
    default:
      return state;
  }
};

const tokenStore = combineReducers({ token });
export default tokenStore;
