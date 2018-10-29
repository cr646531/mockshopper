import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Switch, Route, HashRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar'
import Product from './Product';
import ProductDetail from './ProductDetail';
import Cart from './Cart.js';
import { loadProducts } from '../store';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  componentDidMount() {
    this.props.initProducts();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={NavigationBar} />
          <Switch>
            <Route exact path="/products" component={Product} />
            <Route path="/products/:productId" component={ProductDetail} />
          </Switch>
          <Route exact path="/cart" component={Cart} />
        </div>
      </HashRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initProducts: () => {
      dispatch(loadProducts());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);

//render(<App />, document.getElementById('root'));

/*const ConnectedApp = connect(*/
//null,
//mapDispatchToProps
//)(App);

//render(
//<Provider store={store}>
//<ConnectedApp />
//</Provider>,
//document.getElementById('root')
/*);*/
