import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, HashRouter } from 'react-router-dom';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Account_Creation from './Account_Creation.js';
import Products from './products/Products';
import ProductDetail from './ProductDetail';
import Intro from './Intro.js';
import NavigationBar from './NavigationBar'
import Cart from './Cart.js';
import Login from './Login';

// import Account_Creation, Product_Catalog, Intro, NavigationBar, Product, Cart, Login from '../components';

import { loadUsers, loadProducts, loadReviews, loadImages, getMe, getCreateOrders } from '../store';

class App extends Component {

  componentDidMount() {
    this.props.initProducts();
    this.props.loadOrders();
    this.props.loadReviews();
    // this.props.loadUsers();
    this.props.initImages();
    // this.props.loggedInUser ? this.props.initUser() : null
  }

  render() {
    return (
      <HashRouter>
        <div>
          <NavigationBar />
          <Intro />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/create_account" component={Account_Creation} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:productId" render={ ({ match }) => <ProductDetail productId={ match.params.productId } /> } />
          </Switch>
          <Route exact path='/cart' component={Cart} />

        
        </div>
      </HashRouter>
    );
  }
}

//   render() {
//     return (
//       <HashRouter>
//         <div>
//           <NavigationBar />
//           <Intro />
//           <Switch>
//             <Route exact path="/products" component={Product} />
//             <Route path="/products/:productId" render={ ({ match }) => <ProductDetail productId={ match.params.productId } /> } />
//             { this.props.loggedInUser ? 
//               <Route exact path="/profile" component={Profile} />
//               : null
//             }
//             { this.props.loggedInUser.admin ? 
//                 <Fragment>
//                   <Route exact path="/add/product" component={ProductForm} />
//                   <Route exact path="/admin" component={Admin} />
//                 </Fragment>
//                 :
//                 null
//             }
//             <Route path="/create_account" component={Account_Creation} />
//             <Route path="/login" component={Login} />
//           </Switch>
//           <Route exact path='/cart' component={Cart} />
//         </div>
//       </HashRouter>
//     );
//   }
// }

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
    initUser: () => { dispatch(getMe())},
    initImages: () => { dispatch(loadImages()) },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
