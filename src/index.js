import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { ConnectedRouter } from "connected-react-router";

import App from "./App";

import configureStore, { history } from "./store";

import "./styles.css";

const store = configureStore();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App history={history} />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  rootElement
);
