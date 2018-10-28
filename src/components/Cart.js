import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const cart = state.orders.find(order => order.status === 'CART');

  return {
    products: state.products,
    cart
  };
};

class Cart extends Component {
  constructor() {
    super();

    this.deleteLineItem = this.deleteLineItem.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
  }

  deleteLineItem() {}
  addQuantity() {}
  subtractQuantity() {}

  render() {
    return (
      <div>
        <div align="center">
          <h4>CART</h4>
        </div>
        <br />
        <br />
        {this.props.cart.lineItems.map(lineItem => {
          const lineItemsProduct = this.props.products.find(
            product => product.id === lineItem.productId
          );

          return (
            <div key={lineItem.id} align="center">
              {'Product: ' +
                lineItemsProduct.name +
                '   Quantity: ' +
                lineItem.quantity}
              <button onClick={() => this.addQuantity()}>Subtract</button>
              <button onClick={() => this.subtractQuantity()}>Add</button>
              <button onClick={this.deleteLineItem}>DELETE LINE ITEM</button>
            </div>
          );
        })}
        <br />
      </div>
    );
  }
}

export default Cart;
