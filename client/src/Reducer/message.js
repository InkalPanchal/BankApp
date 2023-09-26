import { CLEAR_MSG, ERR_MSG, SET_MSG } from "../Actions/actions";

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

const msgReducer = (state, action) => {
  // console.log(action.msg);
  switch (action.type) {
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

export default msgReducer;
