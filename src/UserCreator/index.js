import reducer from "./reducer";
import isolate from "../utils/Isolate";
import UserCreatorContainer from "./container";
import { CREATE_USER } from "./actions";

function mapActionsToProps(props) {
  return {
    [CREATE_USER]: (state, action) => props.onUserCreated({ name: state.name })
  };
}

export default isolate(reducer, mapActionsToProps)(UserCreatorContainer);
