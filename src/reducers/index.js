import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import commonReducer from "./common";
import authReducer from "./auth";

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: commonReducer,
    auth: authReducer
  });
