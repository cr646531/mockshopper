import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger'
import thunk from 'redux-thunk';
import axios from 'axios'

//----------------------------------------------------------------------

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const LOAD_REVIEWS = 'LOAD_REVIEWS';
const LOAD_USERS = 'LOAD_USERS';

//----------------------------------------------------------------------

const productReducer = (state = [], action) => {
  switch(action.type){
    case LOAD_PRODUCTS:
      state = action.products;
      break;
  };
  return state;
};

const reviewReducer = (state = [], action) => {
  switch(action.type){
    case LOAD_REVIEWS:
      state = action.reviews;
      break;
  };
  return state;
};

const userReducer = (state = [], action) => {
  switch(action.type){
    case LOAD_USERS:
      state = action.users;
      break;
  };
  return state;
};

const reducer = combineReducers({
  products: productReducer,
  reviews: reviewReducer,
  users: userReducer
});

export default createStore(reducer, applyMiddleware(thunk, loggerMiddleware));

//----------------------------------------------------------------------

const _loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  products
});

const _loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
});

const _loadUsers = (users) => ({
  type: LOAD_USERS,
  users
});

//----------------------------------------------------------------------

export const loadProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products/')
      .then(response => response.data)
      .then(products => {
        dispatch(_loadProducts(products))
      });
  };
};

const loadReviews = () => {
  return (dispatch) => {
    return axios.get('/api/reviews/')
      .then(response => response.data)
      .then(reviews => {
        dispatch(_loadReviews(reviews))
      });
  };
};

const loadUsers = () => {
  return (dispatch) => {
    return axios.get('/api/users')
      .then(response => response.data)
      .then(users => {
        dispatch(_loadUsers(users))
      });
  };
};