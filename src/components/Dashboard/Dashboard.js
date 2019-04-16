import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase.js";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import * as actionCreators from "../../actions";
import * as authCreators from "../../actions/auth.js";

import Loader from "../Micro/Loader/Loader";

import "./Dashboard.css";

const currentUser = firebase.auth().currentUser;
const database = firebase.database().ref();
const storage = firebase.storage();

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.props.authUser(currentUser);
        database.child("users/" + currentUser.uid).on("value", snapshot => {
          this.setState({
            ...snapshot.val(),
            isLoading: false
          });
        });
      } else {
        this.props.push("/login");
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.user
      .updateProfile({
        displayName: this.state.displayName
        // photoURL: this.state.photoURL
      })
      .then(() => {
        console.log(this.props.user);

        console.log("Name updated successfully to " + this.state.displayName);
      })
      .catch(function(error) {
        console.log(error.message);
      });
    database.child("/users/" + this.props.user.uid).update({
      displayName: this.state.displayName
      // photoURL: this.state.photoURL
    });
  }

  handleUpload(e) {
    const currentUser = firebase.auth().currentUser;
    const avatarRef = storage
      .ref()
      .child("images")
      .child("avatars/" + currentUser.uid + ".png");
    const file = e[0];
    avatarRef.put(file);
    avatarRef.getDownloadURL().then(function(url) {
      database.child("users/" + currentUser.uid).update({
        photoURL: url
      });
      currentUser.updateProfile({
        photoURL: url
      });
    });
  }

  render() {
    return !this.state.isLoading ? (
      <div className="dashboard-container">
        <div className="settings">
          <h2 className="setting-heading">Personal information</h2>
          <div className="input-group">
            <label htmlFor="displayName" className="setting-label">
              Display name:
            </label>
            <input
              id="displayName"
              name="displayName"
              value={this.state.displayName}
              onChange={value => this.handleChange(value)}
            />
          </div>
          <div className="inputs-group">
            <button>Change password</button>
          </div>
          <div id="avatar" className="avatar">
            <img src={this.state.photoURL} alt="avatar" />
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={e => this.handleUpload(e.target.files)}
            />
            <label htmlFor="file">edit</label>
          </div>
        </div>

        <div className="settings">
          <h2 className="setting-heading">Shopping list</h2>
          <div className="input-group">
            <label htmlFor="displayName" className="setting-label">
              Default list:
            </label>
            <select>
              <option value={this.state.displayName}>
                {this.state.displayName}
              </option>
            </select>
          </div>
          <div className="inputs-group" />
        </div>
        <div className="settings">
          <div className="inputs-group">
            <button onClick={this.handleSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => {
  const { user, loggedIn } = state.auth;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { ...actionCreators, ...authCreators, push },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
