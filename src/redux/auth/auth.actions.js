import * as types from "./auth.types";

export const toggleRegistrationForm = (show) => {
  return {
    type: types.TOGGLE_REGISTRATION_FORM,
    payload: show,
  };
};

export const toggleAuthenticationForm = (show) => {
  return {
    type: types.TOGGLE_AUTHENTICATION_FORM,
    payload: show,
  };
};

export const updateUser = (user) => {
  return {
    type: types.UPDATE_USER,
    payload: user,
  };
};

export const onLogOut = () => {
    return {
        type: types.LOGOUT
    }
}