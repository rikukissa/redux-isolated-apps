import { namespaced } from "redux-subspace-loop";
import userCreatorReducer from "../UserCreator/reducer";
import { combineReducers } from "redux-loop";

export default combineReducers({
  userCreator1: namespaced("userCreator1")(userCreatorReducer),
  userCreator2: namespaced("userCreator2")(userCreatorReducer),
  userCreator3: namespaced("userCreator3")(userCreatorReducer)
});
