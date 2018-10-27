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
        <li>Profile </li>
        <li className="search">
          <input type="text" className="search-input" placeholder="Search" />
        </li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};


export default Nav

//export default connect(
  //mapStateToProps,
  //mapDispatchToProps
/*)(Nav);*/
