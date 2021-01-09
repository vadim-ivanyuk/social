import React from "react";

export const Field = (props) => {
  const {
    type,
    id,
    label,
    isRequired,
    placeholder,
    value,
    handleChange,
    handleBlur,
    error,
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{`${label}: ${isRequired ? " * " : ""}`}</label>
      <input
        type={type}
        className="form-control"
        name={id}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error ? <p className="text-danger error-text">{error}</p> : null}
    </div>
  );
};
