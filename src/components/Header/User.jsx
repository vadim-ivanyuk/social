import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import defaultAvatar from "../../images/social.svg";
import { withAuth } from "../../hoc/withAuth.jsx";
import { withFirebase } from "../../hoc/withFirebase.jsx";

const firebaseStorageRef = firebase.storage().ref();

const User = (props) => {
  const {
    auth: { user },
    authActions,
  } = props;

  const [showUserModal, toggleUserModal] = useState(null);
  const [avatar, setAvatar] = useState(null);

  firebaseStorageRef
    .child(user.avatar)
    .getDownloadURL()
    .then((avatar) => {
      setAvatar(avatar);
    });

  const handleClick = (event) => {
    toggleUserModal(event.currentTarget);
  };

  const handleClose = () => {
    toggleUserModal(null);
  };

  const open = Boolean(showUserModal);

  return (
    <>
      <div className="mr-3 cursor-pointer favorite">
        <FavoriteIcon className="favorite__icon mr-1" />
        <span style={{ fontSize: "14px" }}>Мои желания</span>
      </div>
      <div
        id="UserModal"
        className="cursor-pointer pl-3 user-anchor"
        onClick={handleClick}
      >
        <img
          src={avatar ? avatar : defaultAvatar}
          className="user-anchor__img"
          alt=""
        />
        <span className="ml-2 user-anchor__name">{user.name}</span>
      </div>
      <Popover
        id="UserModal"
        open={open}
        anchorEl={showUserModal}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="user-modal"
      >
        <Typography className="user-modal__name">
          {user.name}{" "}
          <span className="user-modal__subname">Смотреть профиль</span>
        </Typography>
        <Typography className="user-modal__favorite">Мои желания</Typography>
        <Typography
          onClick={() => authActions.onLogOut()}
          className="user-modal__log-out"
        >
          Выйти
        </Typography>
      </Popover>
    </>
  );
};

export default withAuth(withFirebase(User));
