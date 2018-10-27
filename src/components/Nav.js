import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Nav = props => {
  return (
    <nav>
      <ul className="container">
        <li>Home </li>
        <li>Login</li>
        <li>Logout</li>
        <li>Cart</li>
        <li>Create Account</li>
        <li>Profile</li>
      </ul>
    </nav>
  );
};

export default Nav;

//export default connect(
//mapStateToProps,
//mapDispatchToProps
/*)(Nav);*/
