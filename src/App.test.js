import React from "react";
import App from "./App";
import UserCreator from "./UserCreator";
import createStore from "./store";
import { Provider } from "react-redux";
import { mount } from "enzyme";

function createApp() {
  return mount(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );
}

function getUserList(app) {
  return app.find("#userList");
}

function inputNameValue(userCreator, value) {
  userCreator.find("input").simulate("change", { target: { value } });
}

function createUser(userCreator) {
  inputNameValue(userCreator, "Jorma");
  userCreator.find("form").simulate("submit");
}

describe("App", () => {
  it("has 3 user creator components", () => {
    const app = createApp();
    expect(app.find(UserCreator)).toHaveLength(3);
  });
  it("has one list of users", () => {
    const app = createApp();
    expect(getUserList(app)).toHaveLength(1);
  });
});

describe("User creator", () => {
  it("adds new user to user store when submitted", () => {
    const app = createApp();
    createUser(app.find(UserCreator).first());
    expect(getUserList(app).find(".user").length).toBe(1);
  });
  it("doesn't change other UserCreators' name field value", () => {
    const app = createApp();
    inputNameValue(app.find(UserCreator).first(), "Jorma");
    expect(app.find(UserCreator).first().find("input").props().value).toBe("");
  });
});
