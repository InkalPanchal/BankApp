import React, { createContext } from "react";
import Routing from "./Routes/Routing.jsx";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducers from "./Reducer/reducers.js";

const store = createStore(
  reducers,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// console.log("before dispatch", store.getState());
// store.dispatch({ type: "LOGIN" });

// console.log("after login", store.getState());
// store.dispatch({ type: "LOGOUT" });
// console.log("after logout", store.getState());
export const UserContext = createContext({});
const App = () => {
  return (
    // <UserContext.Provider value={""}>
    <Provider store={store}>
      <Routing />
    </Provider>
    // </UserContext.Provider>
  );
};

export default App;
