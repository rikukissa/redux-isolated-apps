import { UPDATE_NAME_FIELD, CREATE_USER } from "./actions";

const initialState = {
  name: "",
  // Only way of getting the information back to the component..
  createdUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME_FIELD:
      return { ...state, name: action.payload };
    case CREATE_USER:
      return { ...state, createdUser: { name: state.name } };
    default:
      return state;
  }
}
