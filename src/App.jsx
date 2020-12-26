import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import Header from "./components/Header/Header.jsx";
import { withAuth } from "./hoc/withAuth.jsx";

class App extends React.Component {
  componentDidMount() {
    const firebaseDb = firebase.database();
    const { auth, authActions } = this.props;

    if (auth.user_id) {
      firebaseDb
        .ref("users")
        .child(auth.user_id)
        .child("user")
        .on("value", (elem) => authActions.updateUser(elem.val()));
    }
  }

  render() {
    return <Header />;
  }
}

export default withAuth(App);
