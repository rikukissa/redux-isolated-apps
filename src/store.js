import { compose, createStore } from "redux";
import appReducer from "./state/app";
import usersReducer from "./state/users";
import { combineReducers, install } from "redux-loop";

const enhancers = [install()];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default () =>
  createStore(
    combineReducers({
      app: appReducer,
      users: usersReducer
    }),
    compose(...enhancers)
  );
