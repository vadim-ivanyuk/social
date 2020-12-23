import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import firebase from "firebase/app";
import { firebaseConfig } from "./utils/apies";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
