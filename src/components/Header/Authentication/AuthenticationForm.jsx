import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { cookies } from "../../../utils/cookies";
import { withFirebaseDb } from "../../../hoc/withFirebaseDb.jsx";

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
      updateErrors({
        errors: { ...errors },
      });
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
    <div className="w-100 d-flex justify-content-center align-items-center">
      <form className="col-11 registration-form" onSubmit={onSubmit}>
        <h3 className="text-center mb-2 mt-2 form-title">Авторизация</h3>
        <div className="form-group">
          <label htmlFor="email">Логин:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={user.email}
            placeholder="Введите email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="text-danger error-text">{errors.email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={user.password}
            placeholder="Введите пароль"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="text-danger error-text">{errors.password}</p>
        </div>
        <p className="text-danger error-text">{firebaseError}</p>
        <div className="form-group text-center">
          <button
            type="submit"
            className="btn btn-secondary mt-2 pb-2 w-100"
            onSubmit={onSubmit}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default withFirebaseDb(AuthenticationForm);
