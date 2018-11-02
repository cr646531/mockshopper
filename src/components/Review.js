import React, {Component} from 'react';
import {connect} from 'react-redux';


class Review extends Component {

  constructor(){
    super();
    this.state = {
      product: {},
      reviews: []
    }
    this.findProduct = this.findProduct.bind(this);
    this.findReviews = this.findReviews.bind(this);
  }

  componentDidMount(){
    this.findReviews();
  }

  findReviews(){
    const { reviews, productId } = this.props;
    let output = [];

    reviews.map((review) => {
      if(review.productId === productId){
        output.push(review);
      }
    })

    this.setState({ reviews: output });
  }

  render(){
    return (
      <div>
        {
          this.state.reviews.map((review) => (
            <ul>
              <li>{review.text}</li>
            </ul>
          ))
        }
      </div>
    )
  }

}

const mapStateToProps = ({ products, reviews }) => {
  return { products, reviews }
};

export default connect(mapStateToProps)(Review);
