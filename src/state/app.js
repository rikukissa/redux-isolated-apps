const INCREMENT = "INCREMENT";
export function increment() {
  return { type: INCREMENT };
}

const TOGGLE_BUTTON = "TOGGLE_BUTTON";
export function toggleButton() {
  return { type: TOGGLE_BUTTON };
}

const initialState = { count: 0, buttonEnabled: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      const amountToIncrement = state.buttonEnabled ? 2 : 1;
      return { ...state, count: state.count + amountToIncrement };
    case TOGGLE_BUTTON:
      return { ...state, buttonEnabled: !state.buttonEnabled };
    default:
      return state;
  }
}
