import { combineReducers, createStore } from "redux";

import appReducer from "./state/app";
import usersReducer from "./state/users";

export default () =>
  createStore(
    combineReducers({
      app: appReducer,
      users: usersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
