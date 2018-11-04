import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Product extends Component {

  constructor() {
    super();
    this.state = {
      category:'All',
      search:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {

    return (
      <div>
      <div>
        <form id='filterForm'>
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
        <form id='searchFrom'>
          <label> Search: </label>
          <input type='text' name='search' vlaue={this.state.search} onChange={this.handleSearch}/>
        </form>
      </div>

      <div>
        <br />
        {this.state.search === '' ? ( //jsx condition rendering
          this.props.categories.map((category, index) => {
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
          })
        ) : ( // terenary expression
          this.props.products.map(product => {
            if(product.name.includes(this.state.search)){
              return(
                <div key={product.id}>
                  <Link to={`/products/${product.id}`} >{product.name}</Link>
                </div>
              )
            }
          })
        )}


      </div>
      </div>
    );
  }

  handleChange(event) {

    this.setState({
      category: event.target.value
    });

  }

  handleSearch(event) {
    this.setState({
      search: event.target.value
    });
    console.log(this.state.search)
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
