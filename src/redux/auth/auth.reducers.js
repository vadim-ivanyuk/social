import { handleActions } from "redux-actions";
import { cookies } from "../../utils/cookies";

const initialState = {
  user: {
    favouriteProducts: [],
  },
  user_id: cookies.get("user_id"),
  showRegistrationForm: false,
  showAuthenticationForm: false,
};

const authReducer = handleActions(
  {
    TOGGLE_REGISTRATION_FORM: (state, { payload }) => ({
      ...state,
      showRegistrationForm: payload,
    }),
    TOGGLE_AUTHENTICATION_FORM: (state, { payload }) => ({
      ...state,
      showAuthenticationForm: payload,
    }),
    UPDATE_USER: (state, { payload }) => ({
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    }),
    LOGOUT: (state) => (state = initialState),
  },
  initialState
);

export default authReducer;
