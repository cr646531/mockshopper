import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

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
               <NavItem>Logout</NavItem>
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

export default NavigationBar;
