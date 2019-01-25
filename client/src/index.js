import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/components/auth/login";
import Fulllayout from "./layouts/fulllayout.jsx";

import "./assets/scss/style.css";

let auth = false;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {auth ? (
        <Route path="/" key="Starter" component={Fulllayout} />
      ) : (
        <React.Fragment>
          <Route path="/login" key="login" component={Login} />
          <Redirect to="login" key="loginRedirect" component={Login} />
        </React.Fragment>
      )}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
