import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import FavoriteIcon from "@material-ui/icons/Favorite";
import defaultAvatar from "../../../images/social.svg";
import { withAuth } from "../../../hoc/withAuth.jsx";
import { withFirebase } from "../../../hoc/withFirebase.jsx";
import { UserModal } from "./UserModal.jsx";

const firebaseStorageRef = firebase.storage().ref();

const User = (props) => {
  const [showUserModal, toggleUserModal] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const {
    auth: { user },
    authActions,
  } = props;

  useEffect(() => {
    firebaseStorageRef
      .child(user.avatar)
      .getDownloadURL()
      .then((avatar) => {
        setAvatar(avatar);
      });
  }, [user.avatar]);

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
          <span className="user-anchor__name">{user.name}</span>
        </div>
        <UserModal
          showUserModal={showUserModal}
          toggleUserModal={toggleUserModal}
          authActions={authActions}
          user={user}
        />
      </div>
    </div>
  );
};

export default withAuth(withFirebase(User));
