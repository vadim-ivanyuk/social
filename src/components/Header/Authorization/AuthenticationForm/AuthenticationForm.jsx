import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cookies } from "../../../../utils/cookies";
import { AuthenticationFormModal } from "./AuthenticationFormModal.jsx";
import { FIREBASE_DB, FIREBASE } from "../../../../utils/apies";
import {
  updateUser,
  toggleAuthenticationForm,
} from "../../../../redux/auth/auth.actions";

export const AuthenticationForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
      base: null,
    }));
  };

  const validateFields = () => {
    const errors = {};
    const { email, password } = user;

    if (email.length < 5) {
      errors.email = "Укажите логин, в формате primer@gmail.com";
    }
    if (password.length < 6) {
      errors.password = "Укажите пароль, минимум 6 зачений";
    }

    return errors;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const errors = validateFields();
    const error = errors[name];

    if (Object.keys(errors).length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors });
    } else {
      signIn();
    }
  };

  const signIn = () => {
    FIREBASE.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        dispatch(toggleAuthenticationForm(false));
        FIREBASE_DB.ref("users")
          .child(data.user.uid)
          .on("value", (elem) => dispatch(updateUser(JSON.parse(elem.val()))));
        cookies.set("user_id", data.user.uid, {
          path: "/",
          maxAge: 2592000,
        });
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  return (
    <AuthenticationFormModal
      user={user}
      onSubmit={onSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      errors={errors}
      firebaseError={firebaseError}
    />
  );
};
