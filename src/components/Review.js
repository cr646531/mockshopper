import React, {Component} from 'react';
import {connect} from 'react-redux';


class Review extends Component {

  constructor(){
    super();
    this.state = {
      product: {},
      reviews: []
    }
    this.findReviews = this.findReviews.bind(this);
    this.mapUsersToReviews = this.mapUsersToReviews.bind(this);
    this.dateToString = this.dateToString.bind(this);
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

  mapUsersToReviews(){
    const { users } = this.props;
    const { reviews } = this.state;

    reviews.map(review => {
      if(!review.userId){
        review.user = 'Anonymous';
      } else {
        users.map(user => {
          if(user.id === review.userId){
            review.user = user.username;
          }
        });
      }
    });
  }

  dateToString(date) {
    const months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = [null, 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];

    let year = date[0] + date[1] + date[2] + date[3]; year *= 1;
    let day = date[8] + date[9]; day *= 1;
    let month = date[5] + date[6]; month *= 1;

    return months[month] + ' ' + day + days[day] + ', ' + year;

  }

  render(){
    this.mapUsersToReviews();
    return (
      <div>
        <ul>
          {
            this.state.reviews.map(review => (
              <li key={review.id}>
                {review.text} <br /> Posted by {review.user} on {this.dateToString(review.createdAt)}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

}

const mapStateToProps = ({ products, reviews, users }) => {
  return { products, reviews, users }
};

export default connect(mapStateToProps)(Review);
