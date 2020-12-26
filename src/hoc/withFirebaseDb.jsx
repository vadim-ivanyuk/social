import React from "react";
import firebase from "firebase/app";
import { firebaseConfig } from "../utils/apies";

firebase.initializeApp(firebaseConfig);

export const withFirebaseDb = (Component) =>
  class withFirebaseDb extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  };
