import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Contacts from "./contacts/contacts";

import * as serviceWorker from "./serviceWorker";
import store from "./store/configureStore";

const routing = (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
      <Route path="/contacts" component={Contacts} />
      <Redirect from="/" to="contacts" />
    </Router>
  </Provider>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
