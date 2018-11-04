import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import { Card, CardTitle, CardText } from 'reactstrap';




const Admin = ({loggedInUser, reviews, productSelector, orders, users}) => {

  const reviewCards = reviews.map( review => {
    const product = productSelector(review.productId)
    return (
      <Card key={review.id}>
        <CardTitle>{product.name}</CardTitle>
        <CardText >{review.text}</CardText>
      </Card>
    )
  })

  const orderCards = orders.map( order => {
      order.lineItems.map(lineItem => {
          const product = productSelector(lineItem.productId)
          return (
            <Card key={order.id}>
              <CardTitle>{product.name}</CardTitle>
              <CardText >{order.id}</CardText>
              <CardText >{order.quantity}</CardText>
            </Card>
          )
      })
  })

  const userCards = users.map(user => {
      console.log('admin', loggedInUser.admin === false)
    return (
        <Card key={user.id}>
            <CardTitle>{user.username}</CardTitle>
            <CardText >{user.email}</CardText>
            <CardText >admin access? {user.admin == true ? 'true' : 'false'}</CardText>

            <CardText ># orders {orders.filter(order => order.userId === user.id).length}</CardText>
            <CardText ># reviews {reviews.filter(review => review.userId === user.id).length}</CardText>

        </Card>
    )
  })


  return (
    <Fragment>
      <h1>{loggedInUser.username} is logged in and is an admin </h1>
      <hr/>
      <h2>All Orders</h2>
      {orderCards}

      <hr/>
      <h2>All Reviews</h2>
      {reviewCards}
      <hr/>

      <h2>All Users</h2>
      {userCards}

    </Fragment>
  )
}

const mapStateToProps = ({loggedInUser, reviews, products,orders, users}) => {
  
    const productSelector = (productId) => products.find(product => product.id === productId)

  return {
    loggedInUser,
    reviews,
    productSelector, 
    orders,
    users
  }
}
export default connect(mapStateToProps)(Admin)
