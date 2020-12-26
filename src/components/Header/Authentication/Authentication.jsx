import React from "react";
import { Modal, ModalBody } from "reactstrap";
import AuthenticationForm from "./AuthenticationForm.jsx";
import RegistrationForm from "./RegistrationForm.jsx";

export default class Authentication extends React.Component {
  toggleAuthenticationModal = () => {
    const { auth, authActions } = this.props;
    authActions.toggleAuthenticationForm(!auth.showAuthenticationForm);
  };

  toggleRegistrationModal = () => {
    const { auth, authActions } = this.props;
    authActions.toggleRegistrationForm(!auth.showRegistrationForm);
  };

  render() {
    const { auth, authActions } = this.props;
    return (
      <>
        <div className="col-sm-4">
          <button
            type="button"
            className="btn btn-light custom-btn-light"
            onClick={this.toggleAuthenticationModal}
          >
            Вход
          </button>
        </div>
        <Modal
          isOpen={auth.showAuthenticationForm}
          toggle={this.toggleAuthenticationModal}
        >
          <ModalBody>
            <AuthenticationForm auth={auth} authActions={authActions} />
          </ModalBody>
        </Modal>
        <div className="col-sm-6">
          <button
            type="button"
            className="btn btn-light custom-btn-light"
            onClick={this.toggleRegistrationModal}
          >
            Регистрация
          </button>
        </div>
        <Modal
          isOpen={auth.showRegistrationForm}
          toggle={this.toggleRegistrationModal}
        >
          <ModalBody>
            <RegistrationForm auth={auth} authActions={authActions} />
          </ModalBody>
        </Modal>
      </>
    );
  }
}
