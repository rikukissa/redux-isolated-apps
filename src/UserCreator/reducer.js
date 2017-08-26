import { loop, Cmd } from "redux-loop";

import { CREATE_USER, USER_SAVED, saveUser, userSaved } from "./actions";

import { globalAction } from "redux-subspace";
import { reducer as formReducer } from "redux-form";

import { userCreated } from "../state/users";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_SAVED:
      return loop(state, Cmd.action(globalAction(userCreated(action.payload))));

    case CREATE_USER:
      return loop(
        state,
        Cmd.run(saveUser, {
          successActionCreator: userSaved,
          args: [action.payload]
        })
      );

    default:
      return formReducer(state, action);
  }
}
