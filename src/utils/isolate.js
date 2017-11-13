import React, { Component } from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

export default function isolate(reducer, actionsToProps) {
  return function isolateComponent(WrappedComponent) {
    return class Widget extends Component {
      constructor(props) {
        super(props);
        this.displayName = props.id;
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(
          reducer,
          composeEnhancers(
            applyMiddleware(thunk, store => next => action => {
              const result = next(action);
              if (actionsToProps[action.type]) {
                actionsToProps[action.type](action, this.props, store.getState);
              }
              return result;
            })
          )
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
