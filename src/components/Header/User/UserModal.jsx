import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { onLogOut } from "../../../redux/auth/auth.actions";

export const UserModal = (props) => {
  const { showUserModal, toggleUserModal } = props;
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    toggleUserModal(null);
  };

  const open = !!showUserModal;

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
        {auth.user.name}
        <span className="user-modal__subname">Смотреть профиль</span>
      </Typography>
      <Typography className="user-modal__favorite">Мои желания</Typography>
      <Typography className="user-modal__favorite">Мои товары</Typography>
      <Typography
        onClick={() => dispatch(onLogOut())}
        className="user-modal__log-out"
      >
        Выйти
      </Typography>
    </Popover>
  );
};
