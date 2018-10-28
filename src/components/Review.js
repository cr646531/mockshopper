import React, {Component} from 'react';
import {connect} from 'react-redux';


const Review = ({productList}) => {
  // we only need to get the reviews for each products
  // would there be a situation where you would need to get all of the rivews without the associations?
  // I was imagining the product id would be passed in as props
  let singleProduct = productList.find(product => {
    return product.id === +match.params.id
  })

  return (
    <div id='productReview'>
      <ul>
        {singleProduct.review.map(review => {
          return <li key={review.id}> {review.text}</li>
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = ({productList}) => {
  return productList
}
export default connect(mapStateToProps)(Review)
