import React from "react";

export const FieldAvatar = (props) => {
  const { updateAvatar, avatarDisabled, error } = props;
  return (
    <div className="form-group">
      <label htmlFor="avatar">Выберите аватар: *</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        onChange={updateAvatar}
        disabled={avatarDisabled}
        style={{ overflow: "hidden" }}
      />
      {error ? <p className="text-danger error-text">{error}</p> : null}
    </div>
  );
};
