import React from "react";
import { Field } from "../Fields/Field.jsx";
import { FieldAvatar } from "../Fields/FieldAvatar.jsx";

export const RegistrationFormModal = (props) => {
  const {
    user,
    errors,
    firebaseError,
    handleChange,
    updateAvatar,
    handleBlur,
    onSubmit,
  } = props;

  return (
    <form className="col-11 registration-form" onSubmit={onSubmit}>
      <h3 className="text-center mb-2 mt-2 form-title">Регистрация</h3>
      <Field
        type="text"
        id="name"
        label="Имя"
        isRequired={true}
        placeholder="Укажите свое имя"
        value={user.name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.name}
      />
      <Field
        type="email"
        id="email"
        label="Логин"
        isRequired={true}
        placeholder="Введите email"
        value={user.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.email}
      />
      <Field
        type="password"
        id="password"
        label="Пароль"
        isRequired={true}
        placeholder="Введите пароль"
        value={user.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.password}
      />
      <FieldAvatar
        updateAvatar={updateAvatar}
        avatarDisabled={user.avatarDisabled}
        error={errors.avatar}
      />
      <p className="text-danger error-text">{firebaseError}</p>
      <div className="form-group text-center">
        <button
          type="submit"
          className="btn btn-secondary mt-2 pb-2 w-100"
          onSubmit={onSubmit}
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
