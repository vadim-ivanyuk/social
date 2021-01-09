import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export const UserModal = (props) => {
  const { showUserModal, toggleUserModal, authActions, user } = props;

  const handleClose = () => {
    toggleUserModal(null);
  };

  const open = Boolean(showUserModal);

  return (
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
  );
};
