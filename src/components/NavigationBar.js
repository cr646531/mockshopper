import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Login from './OauthLogin'
import { logout } from '../store'


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

    const { handleClick } = this.props;

    return (
      <div>
        <Navbar color="light" light expands="md">
          <NavbarBrand> Lights-Out Brewery </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
               <NavItem onClick={handleClick}>Logout</NavItem>
               <NavItem>
                <Link to="/cart">Cart</Link>
              </NavItem>
               <NavItem>
                <Link to="/products">Products</Link>
              </NavItem>
               <NavItem>
                <Link to="/create_account">Create Account</Link>
              </NavItem>
               <NavItem>
                <Link to="/profile">Profile</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.loggedInUser.id
  }
}

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

export default connect (mapStateToProps, mapDispatchToProps)(NavigationBar);
