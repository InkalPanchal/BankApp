import { combineReducers } from "redux";
import { LOGIN, LOGOUT, VALIDATEFORM } from "../Actions/actions";
import { CLEAR_MSG, ERR_MSG, SET_MSG } from "../Actions/actions";
import { clearAllCookies } from "../Services/cookieFunction";
const defaultState = {
  isLoggedIn: false,
  data: null,
  msg: "",
  errMsg: "",
  validationErrs: {},
};
export function setMessage(message) {
  return {
    type: SET_MSG,
    msg: message,
  };
}
export function clearMessage() {
  return {
    type: CLEAR_MSG,
  };
}
export function setErrMessage(message) {
  // console.log(message);
  return {
    type: ERR_MSG,
    msg: message,
  };
}

export function loginUser() {
  // console.log("user", user);
  return {
    type: LOGIN,
  };
}
export function ValidateForm(user) {
  return {
    type: VALIDATEFORM,
    userData: user,
  };
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      clearAllCookies();
      return { ...state, isLoggedIn: false };
    case SET_MSG:
      return { ...state, msg: action.msg };
    case CLEAR_MSG:
      return { ...state, msg: null };
    case ERR_MSG:
      return { ...state, errMsg: action.msg };
    case VALIDATEFORM:
      const newErrors = {};

      if (!action.userData.Name) {
        newErrors.Name = "Name is required";
      } else if (action.userData.Name.length < 3) {
        newErrors.Name = "Name should be atleast 3 characters long.";
      }

      if (!action.userData.Email) {
        newErrors.Email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(action.userData.Email)) {
        newErrors.Email = "Invalid email address";
      }

      if (!action.userData.Password) {
        newErrors.Password = "Password is required";
      } else if (action.userData.Password.length < 8) {
        newErrors.Password = "Password must be at least 8 characters long";
      }

      if (!action.userData.MobileNo) {
        newErrors.MobileNo = "Mobile Number is required";
      } else if (action.userData.MobileNo.length !== 10) {
        newErrors.MobileNo = "Mobile number must be 10 digits long";
      }

      if (!action.userData.DOB) {
        newErrors.DOB = "Date of birth is required";
      }
      console.log("newErrors", newErrors);
      return Object.keys(newErrors).length === 0
        ? true
        : { ...state, validationErrs: newErrors };
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
