import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import { AuthenticationForm } from "./AuthenticationForm/AuthenticationForm.jsx";
import { RegistrationForm } from "./RegistrationForm/RegistrationForm.jsx";
import {
  toggleAuthenticationForm,
  toggleRegistrationForm,
} from "../../../redux/auth/auth.actions";

export const Authorization = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const toggleAuthenticationModal = () => {
    dispatch(toggleAuthenticationForm(!auth.showAuthenticationForm));
  };

  const toggleRegistrationModal = () => {
    dispatch(toggleRegistrationForm(!auth.showRegistrationForm));
  };

  return (
    <div className="col-sm-4 d-flex align-items-center justify-content-end">
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
          <AuthenticationForm />
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
          <RegistrationForm />
        </ModalBody>
      </Modal>
    </div>
  );
};
