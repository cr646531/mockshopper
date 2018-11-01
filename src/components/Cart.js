import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLineItem } from '../store';

const mapStateToProps = state => {
  return {
    products: state.products,
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLineItem: lineItem => dispatch(createLineItem(lineItem)),
    updateLineItem: lineItem => dispatch(updateLineItem(lineItem))
  };
};

class Cart extends Component {
  constructor() {
    super();

    this.deleteLineItem = this.deleteLineItem.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);

    this.state = {
      loaded: false,
      cart: null
    };

    this.addQuantity = this.addQuantity.bind(this);
  }

  deleteLineItem() {}
  subtractQuantity() {}


  componentDidMount(){
    if(this.props.orders.length > 0 && !(this.state.cart)){
      this.setState({loaded:false})
    }
  }

  componentDidUpdate() {
    if (!this.state.loaded && this.props.orders.length > 0) {
      const cart = this.props.orders.find(order => order.status === 'CART');

      this.setState({ loaded: true, cart });
    }
  }

  addQuantity(productId) {
    const productsLineItem = this.state.cart.lineItems.find(
      lineItem => lineItem.productId === productId
    );

    productsLineItem.quantity += 1;
    this.props.updateLineItem(productsLineItem);
  }

  render() {
    return (
      <div>
        <div align="center">
          <h4>CART</h4>
        </div>
        <br />
        <br />
        {this.state.cart ? (
          this.state.cart.lineItems.map(lineItem => {
            const lineItemsProduct = this.props.products.find(
              product => product.id === lineItem.productId
            );
            return (
              <div key={lineItem.id} align="center">
                {'Product: ' +
                  lineItemsProduct.name +
                  '   Quantity: ' +
                  lineItem.quantity}
                <br />
                <button onClick={() => this.addQuantity(lineItemsProduct.id)}>
                  Add
                </button>
                <button onClick={() => this.subtractQuantity()}>
                  Subtract
                </button>
                <button onClick={this.deleteLineItem}>Delete</button>
              </div>
            );
          })
        ) : (
          <div> Your cart is empty!</div>
        )}
        <br />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
