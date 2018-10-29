import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login'
import { logout } from '../store'

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick () {
      dispatch(logout())
        .then(() => {
          ownProps.history.push('/')
        })
    }
  };
};

const Nav = props => {
  const {handleClick} = props

  return (
    <div className="container">
      <div>
        <Login />
      </div>

      <div><button onClick={handleClick}>Logout</button></div>

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

export default connect(null, mapDispatchToProps)(Nav) ;


