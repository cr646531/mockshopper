import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Card, CardTitle, CardText } from 'reactstrap';




const Profile = ({loggedInUser, reviews ,productSelector}) => {

  const reviewCards = reviews.map( review => {
  const product = productSelector(review.productId)
    return (
      <div key={review.id}>
      <Card>
        <CardTitle>{product.name}</CardTitle>
        <CardText >{review.text}</CardText>
      </Card>
      </div>
    )
  })

  return (
    <div>
      <h1>{loggedInUser.username} is logged in</h1>
      <hr/>
      <h2>Order History</h2>
      <p>placeholder for order history</p>
      <hr/>
      <h2>Review History</h2>
      {reviewCards}
    </div>
  )
}

const mapStateToProps = ({loggedInUser, reviews, products}) => {
  
const productSelector = (productId) => products.find(product => product.id === productId)

  return {
    loggedInUser,
    reviews: reviews.filter(review => loggedInUser.id === review.userId ),
    productSelector
  }
}
export default connect(mapStateToProps)(Profile)
