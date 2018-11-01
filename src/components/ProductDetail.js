import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductDetail extends Component {

  constructor() {
    super();
    this.state = {
      product: {}
    }
  }

  componentDidMount(){
    const { propId, products } = this.props;
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

    products.map(product => {
      if(propId === product.id){
        this.setState({
          product: product
        });
      }
    });
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

    const { product }  = this.state;

    return (
      <div>
        <hr />
        <br />
        <div>Name: {product.name}</div>
        <br />
        <div>Description: </div>
        <br />
        <div> {product.description} </div>
        <div>{this.props.product.description}</div>
        <button onClick={this.addToCart}>Add to Cart</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps 
)(ProductDetail);
