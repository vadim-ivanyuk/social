import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "./User/User.jsx";
import { Authorization } from "./Authorization/Authorization.jsx";
import social from "../../images/social.svg";

export const Header = () => {
  const auth = useSelector((store) => store.auth);

  return (
    <div className="header container pt-1 pl-sm-0 pr-sm-0 pt-sm-3 mt-2 pb-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-center">
          <img src={social} alt="" className="header__icon" />
          <h2 className="ml-0 ml-sm-1 social-title">
            <Link to="/">Social</Link>
          </h2>
        </div>
        {Object.keys(auth.user).length > 1 ? <User /> : <Authorization />}
      </div>
    </div>
  );
};
