import React, { Component } from "react";
import UserCreator from "./UserCreator";
import { connect } from "react-redux";

import { userCreated } from "./state/users";

class App extends Component {
  render() {
    const { users, createUser } = this.props;
    return (
      <div>
        <UserCreator onUserCreated={createUser} id="userCreator1" />
        <UserCreator onUserCreated={createUser} id="userCreator2" />
        <UserCreator onUserCreated={createUser} id="userCreator3" />
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

const mapDispatchToProps = {
  createUser: userCreated
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
