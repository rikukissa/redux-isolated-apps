import { globalAction } from "redux-subspace";
import { userCreated } from "../state/users";
export const UPDATE_NAME_FIELD = "USER_CREATOR/UPDATE_NAME_FIELD";
export function updateNameField(name) {
  return {
    type: UPDATE_NAME_FIELD,
    payload: name
  };
}

export function createUser() {
  return (dispatch, getState, a, b) => {
    const user = getState();
    dispatch(globalAction(userCreated(user)));
  };
}
