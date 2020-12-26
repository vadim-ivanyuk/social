import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { cookies } from "../../../utils/cookies";
import { withFirebaseDb } from "../../../hoc/withFirebaseDb.jsx";

const firebaseDb = firebase.database();

class RegistrationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: "",
        password: "",
        name: "",
      },
      errors: {},
      firebaseError: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null,
      },
    }));
  };

  validateFields = () => {
    const errors = {};
    const { email, password, name } = this.state.user;

    if (email.length < 5) {
      errors.email = "Укажите логин, в формате primer@gmail.com";
    }
    if (password.length < 6) {
      errors.password = "Укажите пароль, минимум 6 зачений";
    }
    if (name.length < 5) {
      errors.name = "Укажите имя, минимум 5 значений";
    }

    return errors;
  };

  handleBlur = (e) => {
    const { name } = e.target;
    const errors = this.validateFields();
    const error = errors[name];

    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, [name]: error },
      }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateFields();

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: { ...errors },
      });
    } else {
      this.createAccount();
    }
  };

  createAccount = () => {
    const { user } = this.state;
    const { authActions } = this.props;

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        authActions.toggleRegistrationForm(false);
        authActions.updateUser(user);
        firebaseDb
          .ref("users")
          .child(data.user.uid)
          .child("user")
          .set({ ...user });
        cookies.set("user_id", data.user.uid, {
          path: "/",
          maxAge: 2592000,
        });
      })
      .catch((error) => {
        this.setState({
          firebaseError: error.message,
        });
      });
  };

  render() {
    const { user, errors, firebaseError } = this.state;

    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <form className="col-11 registration-form" onSubmit={this.onSubmit}>
          <h3 className="text-center mb-2 mt-2 form-title">Регистрация</h3>
          <div className="form-group">
            <label htmlFor="email">Логин:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={user.email}
              placeholder="Введите email"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
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
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <p className="text-danger error-text">{errors.password}</p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={user.name}
              placeholder="Укажите свое имя"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <p className="text-danger error-text">{errors.name}</p>
          </div>
          <p className="text-danger error-text">{firebaseError}</p>
          <div className="form-group text-center">
            <button
              type="submit"
              className="btn btn-secondary mt-2 pb-2 w-100"
              onSubmit={this.onSubmit}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withFirebaseDb(RegistrationForm);
