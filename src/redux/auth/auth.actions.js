import * as types from "./auth.types";
import { createAction } from "redux-actions";

export const toggleRegistrationForm = createAction(
  types.TOGGLE_REGISTRATION_FORM,
  (show) => show
);

export const toggleAuthenticationForm = createAction(
  types.TOGGLE_AUTHENTICATION_FORM,
  (show) => show
);

export const updateUser = createAction(types.UPDATE_USER, (user) => user);

export const onLogOut = createAction(types.LOGOUT);
