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

    products.map(product => {
      if(propId === product.id){
        this.setState({
          product: product
        });
      }
    });
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
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return { 
    products
  }
}

export default connect(mapStateToProps)(ProductDetail);
