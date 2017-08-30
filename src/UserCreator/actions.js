export const UPDATE_NAME_FIELD = "USER_CREATOR/UPDATE_NAME_FIELD";
export function updateNameField(name) {
  return {
    type: UPDATE_NAME_FIELD,
    payload: name
  };
}

export const CREATE_USER = "USER_CREATOR/CREATE_USER";

export function createUser() {
  return { type: CREATE_USER };
}

export const USER_SAVED = "USER_CREATOR/USER_SAVED";
export function userSaved(user) {
  return { type: USER_SAVED, payload: user };
}

export function saveUser(user) {
  return Promise.resolve(user);
}
