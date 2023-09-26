import { combineReducers } from "redux";
import { LOGIN, LOGOUT } from "../Actions/actions";
import { CLEAR_MSG, ERR_MSG, SET_MSG } from "../Actions/actions";
import { clearAllCookies } from "../Services/cookieFunction";
const defaultState = {
  isLoggedIn: false,
  data: null,
  msg: "",
  errMsg: "",
};
export function setMessage(message) {
  return {
    type: SET_MSG,
    msg: message,
  };
}
export function clearMessage(message) {
  return {
    type: CLEAR_MSG,
    msg: message,
  };
}
export function setErrMessage(message) {
  // console.log(message);
  return {
    type: ERR_MSG,
    msg: message,
  };
}

export function loginUser(user) {
  // console.log("user", user);
  return {
    type: LOGIN,
    // userLogin: user,
  };
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(state.isLoggedIn);
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      clearAllCookies();
      return { ...state, isLoggedIn: false };
    case SET_MSG:
      return { ...state, msg: action.msg };
    case CLEAR_MSG:
      return { ...state, msg: null };
    case ERR_MSG:
      // console.log(action.msg);
      return { ...state, errMsg: action.msg };
    default:
      return state;
  }
};

// const msgReducer = (state = defaultState, action) => {
//   console.log(action.msg);
//   switch (action.type) {
//     case SET_MSG:
//       return { ...state, msg: action.msg };
//     case CLEAR_MSG:
//       return { ...state, msg: null };
//     case ERR_MSG:
//       console.log(action.msg);
//       return { ...state, errMsg: action.msg };
//     default:
//       return state;
//   }
// };

const reducers = combineReducers({
  reducer,
  // msgReducer,
});
export default reducers;
