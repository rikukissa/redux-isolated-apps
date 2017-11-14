import React, { Component } from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

export default function isolate(reducer, actionsToProps = {}) {
  return function isolateComponent(WrappedComponent) {
    return class IsolatedComponent extends Component {
      constructor(props) {
        super(props);

        this.displayName = `Isolated(${WrappedComponent.displayName})`;

        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: this.displayName
          }) || compose;

        const actionsToPropsMiddleware = store => next => action => {
          const result = next(action);
          if (actionsToProps[action.type]) {
            actionsToProps[action.type](action, this.props, store.getState);
          }
          return result;
        };

        /*
         * This might be worth taking is as a parameter
         * even though initializing a new store per component might be a bit tedious,
         * people could a function for that like I have in store.js to make the props API like
         * <RandomGif store={createStore()} onLoad={increment} />
         */

        this.store = createStore(
          reducer,
          composeEnhancers(applyMiddleware(thunk, actionsToPropsMiddleware))
        );
      }
      render() {
        return (
          <Provider store={this.store}>
            <WrappedComponent {...this.props} />
          </Provider>
        );
      }
    };
  };
}
