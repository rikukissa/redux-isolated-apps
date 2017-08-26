export const USER_CREATED = "USERS/USER_CREATED";

export function userCreated(user) {
  return {
    type: USER_CREATED,
    payload: user
  };
}

export default function(state = [], action) {
  switch (action.type) {
    case USER_CREATED:
      return state.concat(action.payload);
    default:
      return state;
  }
}
