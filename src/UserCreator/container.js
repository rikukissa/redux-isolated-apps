import React, { Component } from "react";
import { updateNameField, createUser } from "./actions";
import { connect } from "react-redux";

class UserCreator extends Component {
  updateNameField = event => {
    this.props.updateNameField(event.target.value);
  };
  createUser = event => {
    event.preventDefault();
    this.props.createUser();
  };

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

export default connect(mapStateToProps, mapDispatchToProps)(UserCreator);
