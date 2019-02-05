import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { logout } from '../store'
import { Cart } from 'react-bytesize-icons';
import { loadImages } from '../store';

import Search_Bar from './products/Search_Bar';
import { Container, Row, Col } from 'react-grid-system';

import store, { _toggleIntroVisibility} from '../store.js';

class NavigationBar extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleAndLoadImages = this.toggleAndLoadImages.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    store.dispatch(_toggleIntroVisibility());
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
        <Navbar color="light" light expands="md" offset="3" >
        <Col>
          <NavbarBrand> 
            {/* <Link to="/" onClick={this.handleClick} > */}
              <p onClick={this.handleClick}>MockShopper</p>
            {/* </Link> */}
          </NavbarBrand>
          <Link to="/cart">
            <Cart />   
          </Link>
        </Col>
        <Col>
          <Search_Bar />
        </Col>
        <NavbarToggler onClick={this.toggleNavbar} className="ml-auto" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Fragment>
              <NavItem>
                <Link onClick={this.toggleNavbar} to="/add/product">Add Product</Link>
              </NavItem>
            </Fragment>
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
    loggedInUser: state.loggedInUser,
    introVisibility: state.intro.introVisibility
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(logout()).then(() => {
        ownProps.history.push('/');
      });
    },
    loadImages: () => { dispatch(loadImages()) },
    toggleIntroVisibility: () => { dispatch(toggleIntroVisibility()) }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

