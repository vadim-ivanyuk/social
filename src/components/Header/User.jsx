import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { withAuth } from "../../hoc/withAuth.jsx";

const User = (props) => {
  const [showUserModal, toggleUserModal] = useState(null);

  const handleClick = (event) => {
    toggleUserModal(event.currentTarget);
  };

  const handleClose = () => {
    toggleUserModal(null);
  };

  const open = Boolean(showUserModal);

  const {
    auth: { user },
    authActions,
  } = props;
  return (
    <>
      <div id="UserModal" className="cursor-pointer" onClick={handleClick}>
        <img src={user.avatar} className="user-img" alt="" />
        <span className="ml-2">Зраствуйте {user.name}</span>
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

export default withAuth(User);
