const INCREMENT = "INCREMENT";
const TOGGLE_BUTTON = "TOGGLE_BUTTON";

const initialState = { count: 0, buttonEnabled: false };

export function increment() {
  return { type: INCREMENT };
}
export function toggleButton() {
  return { type: TOGGLE_BUTTON };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + (state.buttonEnabled ? 2 : 1) };
    case TOGGLE_BUTTON:
      return { ...state, buttonEnabled: !state.buttonEnabled };
    default:
      return state;
  }
}
