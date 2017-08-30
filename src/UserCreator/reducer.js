import { loop, Cmd } from "redux-loop";

import { CREATE_USER, UPDATE_NAME_FIELD, USER_SAVED, saveUser, userSaved } from "./actions";
import { globalAction } from "redux-subspace";

import { userCreated } from "../state/users";

const initialState = {
  name: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME_FIELD:
      return { ...state, name: action.payload };

    case USER_SAVED:
      return loop(state, Cmd.action(globalAction(userCreated(action.payload))));

    case CREATE_USER:
      return loop(
        state,
        Cmd.run(saveUser, {
          successActionCreator: userSaved,
          args: [state]
        })
      );

    default:
      return state;
  }
}
