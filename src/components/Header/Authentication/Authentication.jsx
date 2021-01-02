import React from "react";
import { Modal, ModalBody } from "reactstrap";
import AuthenticationForm from "./AuthenticationForm/AuthenticationForm.jsx";
import RegistrationForm from "./RegistrationForm/RegistrationForm.jsx";

export const Authentication = (props) => {
  const toggleAuthenticationModal = () => {
    const { auth, authActions } = props;
    authActions.toggleAuthenticationForm(!auth.showAuthenticationForm);
  };

  const toggleRegistrationModal = () => {
    const { auth, authActions } = props;
    authActions.toggleRegistrationForm(!auth.showRegistrationForm);
  };

  const { auth, authActions } = props;
  return (
    <>
      <div className="col-sm-4">
        <button
          type="button"
          className="btn btn-light custom-btn-light"
          onClick={toggleAuthenticationModal}
        >
          Вход
        </button>
      </div>
      <Modal
        isOpen={auth.showAuthenticationForm}
        toggle={toggleAuthenticationModal}
      >
        <ModalBody>
          <AuthenticationForm auth={auth} authActions={authActions} />
        </ModalBody>
      </Modal>
      <div className="col-sm-6">
        <button
          type="button"
          className="btn btn-light custom-btn-light"
          onClick={toggleRegistrationModal}
        >
          Регистрация
        </button>
      </div>
      <Modal
        isOpen={auth.showRegistrationForm}
        toggle={toggleRegistrationModal}
      >
        <ModalBody>
          <RegistrationForm auth={auth} authActions={authActions} />
        </ModalBody>
      </Modal>
    </>
  );
};
