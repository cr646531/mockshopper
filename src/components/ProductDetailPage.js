import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  let student = {};

  if (props.match.params.productId) {
    product = state.products.find(product => {
      return product.id === props.match.params.productId * 1;
    });
  } else {
    console.log('No product');
  }

  return {
    product
  };
};

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div> {this.props.product.name}</div>
        <hr />
        <br />
        <div>{this.props.product.description}</div>
      </div>
    );
  }
}

export default ProductDetailPage;

//export default connect(
//mapStateToProps,
//mapDispatchToProps
/*)(ProductDetailPage);*/
