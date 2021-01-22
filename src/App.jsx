import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import fon from "./images/fon.jpg";
import { Header } from "./components/Header/Header.jsx";
import { Main } from "./components/pages/Main/Main.jsx";
import { CreateProduct } from "./components/pages/CreateProduct/CreateProduct.jsx";
import { updateUser } from "./redux/auth/auth.actions";
import { FIREBASE_DB } from "./utils/apies";

export const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user_id) {
      FIREBASE_DB.ref("users")
        .child(auth.user_id)
        .on("value", (elem) => dispatch(updateUser(JSON.parse(elem.val()))));
    }
  }, []);

  return (
    <BrowserRouter basename="/social/">
      <div className="app">
        <div className="app__img-bg">
          <img src={fon} alt="social" className="w-100 h-100 cover" />
        </div>
        <div className="app__above-img">
          <Header />
          <Route exact path="/" component={Main} />
          <Route path="/create-product/" component={CreateProduct} />
        </div>
      </div>
    </BrowserRouter>
  );
};
