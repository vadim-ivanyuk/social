import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "swiper/swiper-bundle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App.jsx";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
