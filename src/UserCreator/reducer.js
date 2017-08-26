import { UPDATE_NAME_FIELD } from "./actions";

const initialState = {
  name: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME_FIELD:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}
