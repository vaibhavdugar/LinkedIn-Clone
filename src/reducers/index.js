import { combineReducers } from "redux";
import userReducer from "./userReducer";
import articleReducer from "./articleReducer";
import likedReducer from "./likedReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  articleState: articleReducer,
  likedState: likedReducer,
});

export default rootReducer;
