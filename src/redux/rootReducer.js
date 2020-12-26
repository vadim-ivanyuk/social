import { combineReducers } from "redux";
import authReducer from "../redux/auth/auth.reducers";

export default combineReducers({
  auth: authReducer,
});
