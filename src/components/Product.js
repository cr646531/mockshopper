import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Product extends Component {

  constructor() {
    super();
    this.state = {
      category:'All',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  render() {

    return (
      <div>
      <div>
        <form>
          <label>Filter: </label>
          <select onChange={this.handleChange}>
            <option value='All'> All </option>
            {this.props.categories.map((category,index) => {
              return (
                <option key={index} value={category} >{category} </option>
              )
            })}
          </select>
        </form>
      </div>

      <div>
        <br />
        {this.props.categories.map((category, index) => {
          if(category === this.state.category || this.state.category === 'All') {
          return (
            <div key={index}>
            <br />
              {category}
              <hr />
              <br />
              {this.props.products.map(product => {
                  if (product.category === this.state.category) {
                  return (
                    <div key={product.id}>
                      <Link to={`/products/${product.id}`} >{product.name}</Link>
                    </div>
                  );
                }
                if(this.state.category === 'All') {
                  if(product.category === category) {
                    return (
                      <div key={product.id}>
                        <Link to={`/products/${product.id}`} >{product.name}</Link>
                      </div>
                    );
                  }
                }
              })}
            </div>
          );
        }
        })}
      </div>
      </div>
    );
  }

  handleChange(event) {

    this.setState({
      category: event.target.value
    });
    console.log(this.state)
  }

}

const mapStateToProps = ({ products }) => {

  const categories = products.reduce((agg, product) => {
    if (!agg.includes(product.category)) {
      agg.push(product.category);
      return agg;
    } else {
      return agg;
    }
  }, []);

  return {
    products,
    categories
  };
};


export default connect(mapStateToProps)(Product);
