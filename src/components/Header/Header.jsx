import React from "react";
import { withAuth } from "../../hoc/withAuth.jsx";
import User from "./User/User.jsx";
import Authorization from "./Authorization/Authorization.jsx";
import social from "../../images/social.svg";

const Header = (props) => {
  const { auth } = props;

  return (
    <div className="header container pt-1 pl-sm-0 pr-sm-0 pt-sm-3 mt-2 pb-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-center">
          <img src={social} alt="" className="header__icon" />
          <h2 className="ml-0 ml-sm-1 social-title">Social</h2>
        </div>
        {auth.user ? <User /> : <Authorization />}
      </div>
    </div>
  );
};

export default withAuth(Header);
