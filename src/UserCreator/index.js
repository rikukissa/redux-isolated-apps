import React, { Component } from "react";
import { updateNameField, createUser } from "./actions";
import reducer from "./reducer";

import { connect, Provider } from "react-redux";
import { createStore } from "redux";

function isolate(WrappedComponent) {
  return class Widget extends Component {
    constructor(props) {
      super(props);
      this.displayName = props.id;
      this.store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__({ name: props.id })
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
}

class UserCreator extends Component {
  updateNameField = event => {
    this.props.updateNameField(event.target.value);
  };
  createUser = event => {
    event.preventDefault();
    this.props.createUser();
  };

  componentWillReceiveProps(nextProps) {
    const { createdUser } = nextProps;
    if (createdUser && !this.props.createdUser) {
      this.props.onUserCreated(createdUser);
    }
  }

  render() {
    const { name } = this.props;
    return (
      <form onSubmit={this.createUser}>
        <h3>User creator</h3>
        <input type="text" value={name} placeholder="name" onChange={this.updateNameField} />
        <button>Save</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  name: state.name,
  createdUser: state.createdUser
});

const mapDispatchToProps = {
  updateNameField: updateNameField,
  createUser: createUser
};

export default isolate(connect(mapStateToProps, mapDispatchToProps)(UserCreator));
