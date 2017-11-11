import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";

export default function isolate(reducer, mapActionToProps) {
  return WrappedComponent => {
    return class Widget extends Component {
      constructor(props) {
        super(props);
        this.displayName = props.id;

        const composeEnhancers =
          typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                name: this.displayName
              })
            : compose;

        this.store = createStore(
          reducer,
          composeEnhancers(
            applyMiddleware(store => next => action => {
              const result = next(action);
              const state = store.getState();

              const mappings = mapActionToProps(this.props);

              if (mappings[action.type]) {
                mappings[action.type](state, action);
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
