import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  if (props.match.params.productId) {
    product = state.products.find(product => {
      return product.id === props.match.params.productId * 1;
    });
  } else {
    console.log('No product');
  }

  const currentOrder = state.orders.find(order => order.status === 'CART');

  return {
    products: state.products,
    lineItems: state.lineItems,
    currentOrder,
    auth: state.auth
  };
};

class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }

  addToCart() {
    const productsLineItem = this.props.lineItems.find(lineItem => {
      return (
        lineItem.productId === productId &&
        lineItem.orderId === this.props.currentOrder.id
      );
    });

    if (!productsLineItem) {
      this.props.createLineItem({
        orderId: this.props.currentOrder.id,
        quantity: 1,
        productId
      });
    } else {
      productsLineItem.quantity += 1;
      this.props.updateLineItem(productsLineItem);
    }
  }

  render() {
    return (
      <div>
        <div> {this.props.product.name}</div>
        <hr />
        <br />
        <div>{this.props.product.description}</div>
        <button onClick={this.addToCart}>Add to Cart</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps 
)(ProductDetail);
