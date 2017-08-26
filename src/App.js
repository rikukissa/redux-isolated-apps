import React, { Component } from "react";
import UserCreator from "./UserCreator";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <UserCreator />
        <UserCreator />
        <UserCreator />
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
