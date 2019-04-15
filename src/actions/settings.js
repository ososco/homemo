import {
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE
} from "./actionTypes";

import firebase from "../config/firebase.js";

const user = firebase.auth().currentUser;

export const updateSettings = (displayName, photoURL) => {
  return dispatch => {
    dispatch({ type: UPDATE_SETTINGS_REQUEST });
    user
      .updateProfile({
        displayName,
        photoURL
      })
      .then(() => {
        dispatch(updateSettingsSuccess());
      })
      .catch(error => dispatch(updateSettingsFailure(error.message)));
  };
};

const updateSettingsSuccess = () => ({
  type: UPDATE_SETTINGS_SUCCESS,
  updated: true
});

const updateSettingsFailure = error => ({
  type: UPDATE_SETTINGS_FAILURE,
  error
});
