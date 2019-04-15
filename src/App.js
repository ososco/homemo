import React from "react";

import { ConnectedRouter } from "connected-react-router";
import routes from "./routes";

import "./App.css";

const App = ({ history }) => {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
};

export default App;
