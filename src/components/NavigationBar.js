import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Login from './OauthLogin'
import { logout } from '../store'
import { Cart } from 'react-bytesize-icons';

class NavigationBar extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { handleClick, loggedInUser } = this.props;

    return (
      <div>
        <Navbar color="light" light expands="md">
          <NavbarBrand> Lights-Out Brewery </NavbarBrand>
          <Link to="/cart">
            <Cart />
          </Link>
          <NavbarToggler onClick={this.toggleNavbar} className="ml-auto" />
          <Collapse isOpen={!this.state.collapsed} navbar>

            {!loggedInUser.id ? 
              <NavItem onClick={this.toggleNavbar} >
                <Link to="/login">Login</Link>
              </NavItem>
              :
              <Fragment>
                <NavItem onClick={handleClick}>Logout</NavItem>
                <NavItem>
                  <Link onClick={this.toggleNavbar} to="/profile">Profile</Link>
                </NavItem>
              </Fragment>
            }
            {
              loggedInUser.admin && (
              <NavItem>
                <Link onClick={this.toggleNavbar} to="/add/product">Add Product</Link>
              </NavItem>

              )
            }
            <NavItem>
              <Link onClick={this.toggleNavbar} to="/products">Products</Link>
            </NavItem>
            <NavItem>
              <Link onClick={this.toggleNavbar} to="/create_account">Create Account</Link>
            </NavItem>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(logout()).then(() => {
        ownProps.history.push('/');
      });
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

