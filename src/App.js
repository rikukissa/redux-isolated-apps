import React, { Component } from "react";
import UserCreator from "./UserCreator";
import { connect } from "react-redux";
import { SubspaceProvider } from "react-redux-subspace";

class App extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <SubspaceProvider mapState={state => state.app.userCreator1} namespace="userCreator1">
          <UserCreator />
        </SubspaceProvider>

        <SubspaceProvider mapState={state => state.app.userCreator2} namespace="userCreator2">
          <UserCreator />
        </SubspaceProvider>

        <SubspaceProvider mapState={state => state.app.userCreator3} namespace="userCreator3">
          <UserCreator />
        </SubspaceProvider>

        <div id="userList">
          {users.map(({ name }) =>
            <div key={name} className="user">
              {name}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(App);
