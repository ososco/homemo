import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../components/Home/Home";
import Login from "../components/Auth/Login";

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/Login" component={Login} />
    </Switch>
  </div>
);

export default routes;
