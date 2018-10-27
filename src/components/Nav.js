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
    <div className="container">
      <div>
        <Link to="/login">Login</Link>
      </div>

      <div>Logout</div>

      <div>
        <Link to="/cart">Cart</Link>
      </div>

      <div>
        <Link to="/products">Products</Link>
      </div>

      <div>
        <Link to="/create_account">Create Account</Link>
      </div>

      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Nav;

//export default connect(
//mapStateToProps,
//mapDispatchToProps
/*)(Nav);*/
