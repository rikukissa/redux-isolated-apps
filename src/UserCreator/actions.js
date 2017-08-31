export const CREATE_USER = "USER_CREATOR/CREATE_USER";
export function createUser(user) {
  return { type: CREATE_USER, payload: user };
}

export const USER_SAVED = "USER_CREATOR/USER_SAVED";
export function userSaved(user) {
  return { type: USER_SAVED, payload: user };
}

export function saveUser(user) {
  return Promise.resolve(user);
}
