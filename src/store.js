import { compose, combineReducers, createStore } from "redux";
import { applyMiddleware } from "redux-subspace";
import appReducer from "./state/app";
import usersReducer from "./state/users";
import thunk from "redux-thunk";

const enhancers = [applyMiddleware(thunk)];

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
