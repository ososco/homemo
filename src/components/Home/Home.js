import React, { Component } from "react";
import firebase from "../../config/firebase.js";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actionCreators from "../../actions";
import * as authCreators from "../../actions/auth.js";
import { push } from "connected-react-router";

import Loader from "../Micro/Loader/Loader";

import "./Home.css";

const database = firebase.database();
let usersRef = database.ref("users/");
var user = firebase.auth().currentUser;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.authUser(user);
        this.props.loadApp();
      } else {
        this.props.push("./login");
      }
    });
  }

  render() {
    return this.props.appLoaded ? (
      <main>
        <div className="container">
          <div className="home">
            <p>Welcome {this.props.user.displayName}</p>
          </div>
        </div>
      </main>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => {
  const { appName, appLoaded } = state.common;
  const { loggedIn, user } = state.auth;
  return { appName, appLoaded, user, loggedIn };
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
)(Home);
