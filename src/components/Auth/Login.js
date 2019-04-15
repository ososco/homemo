import React, { Component } from "react";
import firebase from "../../config/firebase.js";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import * as actionCreators from "../../actions/auth.js";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.authUser(user);
        this.props.push("/home");
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="login-container">
        <div>
          {this.props.error ? (
            <p className="login-errors"> {this.props.error}</p>
          ) : null}
        </div>
        <div className="login-form">
          <p>Login</p>
          <input
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Login</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggedIn, error } = state.auth;
  return { loggedIn, error };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actionCreators, push }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
