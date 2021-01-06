import React from "react";
import { withAuth } from "../../hoc/withAuth.jsx";
import User from "./User.jsx";
import { Authorization } from "./Authorization/Authorization.jsx";
import fon from "../../images/fon.jpg";
import social from "../../images/social.svg";

const Header = (props) => {
  const { auth, authActions } = props;

  return (
    <div className="header">
      <div className="header__img-bg">
        <img src={fon} alt="social" className="w-100 h-100 cover" />
      </div>
      <div className="header__above-img">
        <div className="container pt-3 mt-2 pb-4">
          <div className="row justify-content-between">
            <div className="col-sm-3 d-flex justify-content-center">
              <img src={social} alt="" className="header__icon" />
              <h2 className="ml-1 social-title">Social</h2>
            </div>
            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              {auth.user ? (
                <User />
              ) : (
                <Authorization auth={auth} authActions={authActions} />
              )}
            </div>
          </div>
        </div>
        <div className="container main">
          <div className="row">
            <div className="col-sm-6">
              <div className="col-sm-12 main__social-text pt-4">
                {/* Social - это платформа, где вы сможете найти товар всех
                категорий. */}
                <span style={{ fontWeight: "bold" }}>Social</span> - это
                торговая площадка, предоставляющая возможность покупать и
                продавать товары.
              </div>
              <div className="col-sm-11 main__social-text pt-3">
                Мы работаем, чтобы у нас вы смогли найти абсолютно всё.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Header);
