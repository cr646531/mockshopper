import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Login from './OauthLogin'
import { logout } from '../store'
import { Cart } from 'react-bytesize-icons';
import { loadImages } from '../store';

class NavigationBar extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleAndLoadImages = this.toggleAndLoadImages.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleAndLoadImages(){
    this.setState({
      collapsed: !this.state.collapsed
    });
    this.props.loadImages();
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
              <Fragment>
                <NavItem>
                  <Link onClick={this.toggleNavbar} to="/add/product">Add Product</Link>
                </NavItem>
                <NavItem>
                  <Link onClick={this.toggleNavbar} to="/admin">Admin</Link>
                </NavItem>
              </Fragment>
              )
            }
            <NavItem>
              <Link onClick={this.toggleAndLoadImages} to="/products">Products</Link>
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
    },
    loadImages: () => { dispatch(loadImages()) }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

