import * as types from "./auth.types";
import { cookies } from "../../utils/cookies";

const initialState = {
  user: null,
  user_id: cookies.get("user_id"),
  showRegistrationForm: false,
  showAuthenticationForm: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_REGISTRATION_FORM:
      return {
        ...state,
        showRegistrationForm: action.payload,
      };
    case types.TOGGLE_AUTHENTICATION_FORM:
      return {
        ...state,
        showAuthenticationForm: action.payload,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        user: {
          email: action.payload.email,
          password: action.payload.password,
          name: action.payload.name,
        },
      };
    case types.LOGOUT:
      return (state = initialState);
    default:
      return state;
  }
}
