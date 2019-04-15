import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";

import * as actionCreators from "../../actions";
import { logoutUser } from "../../actions/auth";

import "./Header.css";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (
      !this.dropdownMenu.contains(event.target) ||
      this.dropdownMenu.contains(event.target)
    ) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img
            src="https://cdn3.iconfinder.com/data/icons/education-flat-icon/130/61-512.png"
            alt="logo"
            onClick={() => this.props.push("./home")}
          />
          <h1 draggable="true" onClick={() => this.props.push("./home")}>
            {this.props.appName}
          </h1>
        </div>
        <div className="menu">
          {this.props.loggedIn ? (
            <>
              <Link to="/" onClick={this.showMenu}>
                <img src={this.props.user.photoURL} alt="avatar" />
              </Link>
              {this.state.showMenu ? (
                <div
                  className="dropdown-menu"
                  ref={element => {
                    this.dropdownMenu = element;
                  }}
                >
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      this.props.push("/dashboard");
                    }}
                  >
                    <i className="fas fa-user-cog" />
                    <p>Dashboard</p>
                  </Link>
                  <div role="none" className="dropdown-divider" />
                  <Link to="/" onClick={logoutUser()}>
                    <i className="fas fa-sign-out-alt" />
                    <p>Logout</p>
                  </Link>
                </div>
              ) : null}
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => {
                this.props.push("/login");
              }}
            >
              <i className="fas fa-sign-in-alt" />
              <p>Login</p>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { appName } = state.common;
  const { loggedIn, user } = state.auth;
  return { appName, loggedIn, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actionCreators, push }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
