import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { cookies } from "../../../../utils/cookies";
import { withFirebaseDb } from "../../../../hoc/withFirebaseDb.jsx";
import { AuthenticationFormModal } from "./AuthenticationFormModal.jsx";

const firebaseDb = firebase.database();

const AuthenticationForm = (props) => {
  const [user, updateUser] = useState({ email: "", password: "" });
  const [errors, updateErrors] = useState({});
  const [firebaseError, updateFirebaseError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUser({
      ...user,
      [name]: value,
    });
    updateErrors({
      ...errors,
      [name]: null,
      base: null,
    });
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
      updateErrors({ [name]: error });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      updateErrors({ ...errors });
    } else {
      signIn();
    }
  };

  const signIn = () => {
    const { authActions } = props;

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        authActions.toggleAuthenticationForm(false);
        firebaseDb
          .ref("users")
          .child(data.user.uid)
          .on("value", (elem) => authActions.updateUser(elem.val()));
        cookies.set("user_id", data.user.uid, {
          path: "/",
          maxAge: 2592000,
        });
      })
      .catch((error) => {
        updateFirebaseError(error.message);
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

export default withFirebaseDb(AuthenticationForm);
