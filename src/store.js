import { combineReducers, createStore } from "redux";

import appReducer from "./state/app";

export default () =>
  createStore(
    combineReducers({
      app: appReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
