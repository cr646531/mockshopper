import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const categories = state.products.reduce((agg, product) => {
    if (!agg.includes(product.category)) {
      agg.push(product.category);
      return agg;
    } else {
      return agg;
    }
  }, []);

  return {
    products: state.products,
    categories
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.categories.map((category, index) => {
          return (
            <div key={index}>
              {category}
              <hr />
              <br />
              {this.props.products.map(product => {
                if (product.category === category) {
                  return (
                    <div key={product.id}>
                      <Link to={`/products/${product.id}`}>product.name</Link>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductPage;

//export default connect(
//mapStateToProps,
//mapDispatchToProps
/*)(ProductPage);*/
