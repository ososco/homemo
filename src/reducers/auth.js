import {
  LOGING_USER_REQUEST,
  LOGING_USER_SUCCESS,
  LOGING_USER_FAILURE,
  LOGOUT_USER,
  AUTH_USER
} from "../actions/actionTypes";

const defaultState = {
  loggingIn: false,
  loggedIn: false,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGING_USER_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case LOGING_USER_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: action.loggedIn,
        user: action.user,
        error: null
      };
    case LOGING_USER_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: action.error
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        loggingIn: false,
        loggedIn: false
      };
    case AUTH_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    default:
      return state;
  }
};
