import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLineItem, updateLineItem } from '../store';
import Review from './Review';

const mapDispatchToProps = dispatch => {
  return {
    createLineItem: lineItem => dispatch(createLineItem(lineItem)),
    updateLineItem: lineItem => dispatch(updateLineItem(lineItem))
  };
};

const mapStateToProps = (state, props) => {
  const currentOrder = state.orders.find(order => {
    if (state.loggedInUser.id) {
      return order.status === 'CART' && order.userId === state.loggedInUser.id;
    } else {
     return order.status === 'CART' && (!order.userId);
    }
  });

  return {
    products: state.products,
    lineItems: state.lineItems,
    currentOrder,
    auth: state.auth,
    images: state.images
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
    if (!this.state.loaded && this.props.products.length > 0) {
      const product = this.props.products.find(product => {
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
            {
              this.props.images.map(image => {
                if(image.id === this.state.product.imageId){
                  return (
                    <img key={image.id} src={image.data} />
                  )
                }
              })
            }
            <hr />
            <br />
            <div>Name: {this.state.product.name}</div>
            <div>Description: {this.state.product.description} </div>
            <div> Category: {this.state.product.category} </div>
            <div> Reviews: 
              <Review productId={this.props.productId} />
            </div>
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
