import React from "react";
import { Field } from "../Fields/Field.jsx";

export const AuthenticationFormModal = (props) => {
  const {
    user,
    onSubmit,
    handleChange,
    handleBlur,
    errors,
    firebaseError,
  } = props;
  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <form className="col-11 registration-form" onSubmit={onSubmit}>
        <h3 className="text-center mb-2 mt-2 form-title">Авторизация</h3>
        <Field
          type="email"
          id="email"
          label="Логин"
          placeholder="Введите логин"
          value={user.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.email}
        />
        <Field
          type="password"
          id="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={user.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.password}
        />
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
