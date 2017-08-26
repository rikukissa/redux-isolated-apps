import React, { Component } from "react";
import { createUser } from "./actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

class UserCreator extends Component {
  createUser = user => {
    this.props.createUser(user);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.createUser)}>
        <h3>User creator</h3>
        <Field name="name" component="input" type="text" placeholder="name" />
        <button>Save</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  createUser: createUser
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    getFormState: state => {
      return state;
    },
    form: "user"
  })(UserCreator)
);
