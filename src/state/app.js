import { combineReducers } from "redux";
import { namespaced } from "redux-subspace";
import userCreatorReducer from "../UserCreator/reducer";

export default combineReducers({
  userCreator1: namespaced("userCreator1")(userCreatorReducer),
  userCreator2: namespaced("userCreator2")(userCreatorReducer),
  userCreator3: namespaced("userCreator3")(userCreatorReducer)
});
