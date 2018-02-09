import { UPDATE_NAME_FIELD, CREATE_USER } from "./actions";

const initialState = {
  name: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME_FIELD:
      return { ...state, name: action.payload };
    case CREATE_USER:
      return state;
    default:
      return state;
  }
}
