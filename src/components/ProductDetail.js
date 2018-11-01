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
  const currentOrder = state.orders.find(order => order.status === 'CART');

  return {
    products: state.products,
    lineItems: state.lineItems,
    currentOrder,
    auth: state.auth
  };
};

class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      product: null,
      loaded: false
    };

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    if (!this.state.product) {
      this.setState({ loaded: false });
    }
  }

  componentDidUpdate(prevProps) {
    /*console.log('product on state:');*/
    //console.log(this.state.product);
    //console.log(this.props.products)
    //console.log(this.props.productId)

    if ((!this.state.loaded) && this.props.products.length > 0) {
      let product = null;

      product = this.props.products.find(product => {
        return product.id === this.props.productId;
      });

      this.setState({ loaded: true, product });
    }
  }

  addToCart() {
    const productsLineItem = this.props.currentOrder.lineItems.find(
      lineItem => lineItem.productId === this.state.product.id
    );

    if (!productsLineItem) {
      this.props.createLineItem({
        orderId: this.props.currentOrder.id,
        quantity: 1,
        productId: this.state.product.id
      });
    } else {
      productsLineItem.quantity += 1;
      this.props.updateLineItem(productsLineItem);
    }
  }

  render() {
    return (
      <div>
        {this.state.product ? (
          <div>
            <hr />
            <br />
            <div>Name: {this.state.product.name}</div>
            <br />
            <div>Description: </div>
            <br />
            <div> {this.state.product.description} </div>
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
