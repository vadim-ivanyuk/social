import React from "react";
import { withAuth } from "../../hoc/withAuth.jsx";
import User from "./User.jsx";
import Authentication from "./Authentication/Authentication.jsx";
import fon from "../../images/fon.jpg";
import social from "../../images/social.svg";

class Header extends React.Component {
  render() {
    const { auth, authActions } = this.props;
    return (
      <div className="header">
        <div className="header__img-bg">
          <img src={fon} alt="social" className="w-100 h-100 cover" />
        </div>
        <div className="header__above-img">
          <div className="container pt-4 mt-2 pb-4">
            <div className="row justify-content-between">
              <div className="col-sm-3 d-flex justify-content-center">
                <img src={social} alt="" className="header__icon" />
                <h2 className="ml-1">Social</h2>
              </div>
              <div className="col-sm-4 d-flex align-items-center justify-content-end">
                {auth.user ? (
                  <User />
                ) : (
                  <Authentication auth={auth} authActions={authActions} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Header);
