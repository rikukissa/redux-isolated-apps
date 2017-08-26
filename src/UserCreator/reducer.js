import { loop, Cmd } from "redux-loop";

import { CREATE_USER, UPDATE_NAME_FIELD } from "./actions";
import { globalAction } from "redux-subspace";
import { userCreated } from "../state/users";

const initialState = {
  name: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME_FIELD:
      return { ...state, name: action.payload };
    case CREATE_USER:
      return loop(state, Cmd.action(globalAction(userCreated(state))));
    default:
      return state;
  }
}
