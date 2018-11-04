import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitOrder, updateLineItem, destroyLineItem } from '../store';

const mapStateToProps = state => {
  const cart = state.orders.find(order => {
    if (state.loggedInUser.id) {
      return order.status === 'CART' && order.userId === state.loggedInUser.id;
    } else {
      return order.status === 'CART' && !order.userId;
    }
  });

  return {
    products: state.products,
    orders: state.orders,
    cart,
    user: state.loggedInUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLineItem: lineItem => dispatch(updateLineItem(lineItem)),
    destroyLineItem: lineItem => dispatch(destroyLineItem(lineItem)),
    submitOrder: userId => dispatch(submitOrder(userId))
  };
};

class Cart extends Component {
  constructor() {
    super();
    this.destroyLineItem = this.destroyLineItem.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  subtractQuantity(lineItem) {
    if (lineItem.quantity === 1) {
      this.props.destroyLineItem(lineItem);
    } else {
      lineItem.quantity -= 1;
      this.props.updateLineItem(lineItem);
    }
  }

  destroyLineItem(lineItem) {
    this.props.destroyLineItem(lineItem);
  }

  addQuantity(lineItem) {
    lineItem.quantity += 1;
    this.props.updateLineItem(lineItem);
  }

  submitOrder() {


    console.log(this.props.user)

    this.props.user.id
      ? this.props.submitOrder(this.props.user.id)
      : this.props.submitOrder();
  }

  componentDidUpdate() {
    console.log(this.props.cart);
  }

  render() {
    return (
      <div>
        <div align="center">
          <h4>CART</h4>
        </div>
        <br />
        <br />
        {this.props.cart ? (
          <div>
            <button onClick={this.submitOrder}>Submit Order </button>
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
                  <br />
                  <button onClick={() => this.addQuantity(lineItem)}>
                    Add
                  </button>
                  <button onClick={() => this.subtractQuantity(lineItem)}>
                    Subtract
                  </button>
                  <button onClick={() => this.destroyLineItem(lineItem)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
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
