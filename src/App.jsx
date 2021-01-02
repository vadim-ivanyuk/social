import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import Header from "./components/Header/Header.jsx";
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

  return <Header />;
};

export default withAuth(App);
