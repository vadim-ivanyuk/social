import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import defaultAvatar from "../../../images/social.svg";
import { UserModal } from "./UserModal.jsx";
import { FIREBASE_STORAGE_REF } from "../../../utils/apies";

export const User = () => {
  const [showUserModal, toggleUserModal] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    FIREBASE_STORAGE_REF.child(auth.user.avatar)
      .getDownloadURL()
      .then((avatar) => {
        setAvatar(avatar);
      });
  }, [auth.user.avatar]);

  const handleClick = (event) => {
    toggleUserModal(event.currentTarget);
  };

  return (
    <div className="col-xl-6 col-lg-7 col-sm-7 col-4 d-flex align-items-center justify-content-end">
      <div className="d-flex align-items-center">
        <div className="mr-0 mr-md-3 cursor-pointer favorite">
          <FavoriteIcon className="favorite__icon mr-1" />
          <span style={{ fontSize: "13.5px" }}>Мои желания</span>
        </div>
        <div
          id="UserModal"
          className="cursor-pointer pl-0 pl-sm-3 user-anchor"
          onClick={handleClick}
        >
          <img
            src={avatar ? avatar : defaultAvatar}
            className="user-anchor__img p-0"
            alt=""
          />
          <span className="user-anchor__name">{auth.user.name}</span>
        </div>
        <UserModal
          showUserModal={showUserModal}
          toggleUserModal={toggleUserModal}
        />
      </div>
    </div>
  );
};
