import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cookies } from "../utils/cookies";
import rootReducer from "../redux/rootReducer";
import { LOGOUT } from "./auth/auth.types";

const updateCookies = () => (next) => (action) => {
  if (action.type === LOGOUT) {
    cookies.remove("user_id", {
      path: "/",
    });
  }

  return next(action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, updateCookies))
);

export default store;
