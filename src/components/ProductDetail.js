import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  let product = null;

  if (props.match.params.productId) {
    product = state.products.find(product => {
      return product.id === props.match.params.productId;
    });
  } else {
    console.log('No product');
  }

  return {
    product
  };
};

class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.product ? (
          <div>
            <div> {this.props.product.name}</div>
            <hr />
            <br />
            <div>{this.props.product.description}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductDetail);
