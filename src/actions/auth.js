import {
  LOGING_USER_REQUEST,
  LOGING_USER_SUCCESS,
  LOGING_USER_FAILURE,
  LOGOUT_USER,
  AUTH_USER
} from "./actionTypes";

import firebase from "../config/firebase.js";

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch({ type: LOGING_USER_REQUEST });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(loginUserSuccess(res.user));
      })
      .catch(error => dispatch(loginUserFailure(error.message)));
  };
};

const loginUserSuccess = user => ({
  type: LOGING_USER_SUCCESS,
  loggedIn: true,
  user
});

const loginUserFailure = error => ({
  type: LOGING_USER_FAILURE,
  error
});

export const logoutUser = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(dispatch({ type: LOGOUT_USER }))
      .catch(function(error) {
        // An error happened.
      });
  };
};

export const authUser = user => ({
  type: AUTH_USER,
  user
});
