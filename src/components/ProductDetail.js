import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLineItem, updateLineItem } from '../store';

const mapDispatchToProps = dispatch => {
  return {
    createLineItem: lineItem => dispatch(createLineItem(lineItem)),
    updateLineItem: lineItem => dispatch(updateLineItem(lineItem))
  };
};

const mapStateToProps = (state, props) => {
  let product = null;

  if (props.productId) {
    product = state.products.find(product => {
      return product.id === props.productId;
    });
  } else {
    console.log('No product');
  }

  const currentOrder = state.orders.find(order => order.status === 'CART');

  return {
    products: state.products,
    lineItems: state.lineItems,
    currentOrder,
    auth: state.auth,
    product
  };
};

class ProductDetail extends Component {
  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log(this.props.product);
  }

  addToCart() {
    const productsLineItem = this.props.currentOrder.lineItems.find(
      lineItem => lineItem.productId === this.props.product.id
    );

    if (!productsLineItem) {
      this.props.createLineItem({
        orderId: this.props.currentOrder.id,
        quantity: 1,
        productId: this.props.product.id
      });
    } else {
      productsLineItem.quantity += 1;
      this.props.updateLineItem(productsLineItem);
    }
  }

  render() {
    return (
      <div>
        {this.props.product ? (
          <div>
            <hr />
            <br />
            <div>Name: {this.props.product.name}</div>
            <br />
            <div>Description: </div>
            <br />
            <div> {this.props.product.description} </div>
            <br />
            <button onClick={this.addToCart}>Add to Cart</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
