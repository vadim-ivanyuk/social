import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { BrowserRouter, Route } from "react-router-dom";
import fon from "./images/fon.jpg";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import { CreateProductPage } from "./pages/CreateProductPage.jsx";
import { withAuth } from "./hoc/withAuth.jsx";

const firebaseDb = firebase.database();

const App = (props) => {
  const { auth, authActions } = props;

  useEffect(() => {
    if (auth.user_id) {
      firebaseDb
        .ref("users")
        .child(auth.user_id)
        .on("value", (elem) => authActions.updateUser(elem.val()));
    }
  }, [auth.user_id, authActions]);

  return (
    <BrowserRouter basename="/social/">
      <div className="app">
        <div className="app__img-bg">
          <img src={fon} alt="social" className="w-100 h-100 cover" />
        </div>
        <div className="app__above-img">
          <Header />
          <Route exact path="/" component={Main} />
          <Route path="/create-product/" component={CreateProductPage} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default withAuth(App);
