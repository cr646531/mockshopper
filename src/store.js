import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

//----------------------------------------------------------------------

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const LOAD_REVIEWS = 'LOAD_REVIEWS';
const LOAD_USERS = 'LOAD_USERS';
const GET_ME = 'GET_ME';
const GET_CREATE_ORDER = 'GET_CREATE_ORDER';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

//----------------------------------------------------------------------

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CREATE_ORDER:
      return action.orders
  }
  return state;
};

const productReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      state = action.products;
      break;
    case CREATE_PRODUCT:
      state = [...state].push(action.product);
      break;
  }
  return state;
};

const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      state = action.reviews;
      break;
  }
  return state;
};

const userReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_USERS:
      state = action.users;
      break;
  }
  return state;
};

const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ME:
      state = action.loggedInUser;
      break;
    }
    return state
};

const reducer = combineReducers({
  products: productReducer,
  reviews: reviewReducer,
  users: userReducer,
  loggedInUser: loggedInUserReducer,
  orders: orderReducer
});

export default createStore(reducer, applyMiddleware(thunk, loggerMiddleware));

//----------------------------------------------------------------------

const _loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});

const _loadReviews = reviews => ({
  type: LOAD_REVIEWS,
  reviews
});

const _loadUsers = users => ({
  type: LOAD_USERS,
  users
});

const _getMe = loggedInUser => ({
  type: GET_ME,
  loggedInUser
});

const addOrdersToState = orders => {
  return {
    type: GET_CREATE_ORDER,
    orders
  };
};

const _createProduct = (product) => {
  return {
  type: CREATE_PRODUCT,
  product
  }
};

//----------------------------------------------------------------------
export const destroyLineItem = lineItem => {
  return dispatch => {
    axios
      .delete(`/api/lineItems/${lineItem.id}/order/${lineItem.orderId}`)
      .then(() => dispatch(getCreateOrders()))
      .catch(err => console.log(err));
  };
};

export const updateLineItem = lineItem => {
  return dispatch => {
    axios
      .put(`/api/lineItems/${lineItem.id}/order/${lineItem.orderId}`, lineItem)
      .then(() => dispatch(getCreateOrders()))
      .catch(err => console.log(err));
  };
};

export const createLineItem = lineItem => {
  return dispatch => {
    axios
      .post(`/api/lineItems/order/${lineItem.orderId}`, lineItem)
      .then(() => dispatch(getCreateOrders()))
      .then(err => console.log(err));
  };
};

export const getCreateOrders = () => {
  return dispatch => {
    axios
      .get('/api/cart/orders')
      .then(response => dispatch(addOrdersToState(response.data)))
      .catch(err => console.log(err));
  };
};
//---------------------------------------------------------------

export const loadProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products/')
      .then(response => response.data)
      .then(products => {
        dispatch(_loadProducts(products));
      });
  };
};

export const createProduct = (product) => {
  return dispatch => {
    return axios
      .post('/api/products/')
      .then(response => response.data)
      .then(product => {
        dispatch(_createProduct(product));w
      });
  };
};

export const loadReviews = () => {
  return dispatch => {
    return axios
      .get('/api/reviews/')
      .then(response => response.data)
      .then(reviews => {
        dispatch(_loadReviews(reviews));
      });
  };
};

export const loadUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => {
        dispatch(_loadUsers(users));
      });
  };
};


// gets logged in user
export const getMe = () => dispatch => {
  return axios
    .get('/auth/me')
    .then(res => res.data)

    .then(loggedInUser => {
      console.log("USER",loggedInUser)
      dispatch(_getMe(loggedInUser))
    })
    .catch(error => console.log(error))
}


//authorizes user
export const login = (credentials) => dispatch => {
    return axios.put('/auth/login', credentials)
    .then(res => res.data)
    .then( (loggedInUser) => dispatch(getMe(loggedInUser)))
  }


export const logout = () => dispatch => {
  return axios.delete('/auth/logout')
    .then(() => dispatch(_getMe({})))
    .catch(console.error.bind(console))
}