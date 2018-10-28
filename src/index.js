import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart.js'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Nav} />
          <Switch>
            <Route exact path="/products" component={Product} />
            <Route path="/products/:productId" component={ProductDetail} />
          </Switch>
          <Route exact path='/cart' component={Cart} />
        </div>
      </HashRouter>
    );
  }
}

render(<App />, document.getElementById('root'));

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
