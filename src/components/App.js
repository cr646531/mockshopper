import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Switch, Route, HashRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar'
import Product from './Product';
import ProductDetail from './ProductDetail';
import Profile from './Profile';
import Cart from './Cart.js';
import ProductForm from './ProductForm.js';
import store, { loadUsers, loadProducts, loadReviews, getMe, getCreateOrders } from '../store';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CreateAccount, Login } from './Login';

class App extends Component {

  componentDidMount() {
    
    this.props.initProducts();
    this.props.loadOrders();
    this.props.loadReviews();
    this.props.loadUsers();
    this.props.loggedInUser ? this.props.initUser() : null

  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={NavigationBar} />
          <Switch>
            <Route exact path="/products" component={Product} />
            <Route path="/products/:productId" render={ ({ match }) => <ProductDetail productId={ match.params.productId } /> } />
            <Route exact path="/add/product" component={ProductForm} />
            { this.props.loggedInUser ? 
              <Route exact path="/profile" component={Profile} />
              : null
            }
            <Route path="/create_account" component={CreateAccount} />
            <Route path="/login" component={Login} />
          </Switch>
          <Route exact path='/cart' component={Cart} />
        </div>
      </HashRouter>
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

    loadOrders: () => dispatch(getCreateOrders()),
    loadReviews: () => dispatch(loadReviews()),
    loadUsers: () => dispatch(loadUsers()),
    initProducts: () => { dispatch(loadProducts()) },
    initUser: () => { dispatch(getMe())} 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

