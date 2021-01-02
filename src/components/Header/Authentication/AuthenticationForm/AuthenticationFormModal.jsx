import React from "react";

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
