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
const LOAD_IMAGES = 'LOAD_IMAGES';
const CREATE_IMAGE = 'CREATE_IMAGE';

const SUBMIT_ORDER = 'SUBMIT_ORDER';

//----------------------------------------------------------------------

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CREATE_ORDER:
      return action.orders;
  }
  return state;
};

const productReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      state = action.products;
      break;
    case CREATE_PRODUCT:
      state = [...state, action.product];
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
  return state;
};

const imageReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_IMAGES:
      state = action.images;
      break;
    case CREATE_IMAGE:
      state = [...state, action.image];
      break;
  };
  return state;
};

const reducer = combineReducers({
  products: productReducer,
  reviews: reviewReducer,
  users: userReducer,
  loggedInUser: loggedInUserReducer,
  orders: orderReducer,
  images: imageReducer
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

const _createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  };
};

const _loadImages = images => {
  return {
    type: LOAD_IMAGES,
    images
  };
};

const _createImage = (image) => {
  return {
    type: CREATE_IMAGE,
    image
  };
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
      .post(`/api/lineItems/order/`, lineItem)
      .then(() => dispatch(getCreateOrders()))
      .then(err => console.log(err));
  };
};

export const getCreateOrders = () => {
  return (dispatch, getState) => {
    const { loggedInUser } = getState();
    return axios
      .post('/api/cart/update_user_id', loggedInUser)
      .then(() => axios.get(`/api/cart/orders/`))
      .then(response => dispatch(addOrdersToState(response.data)));
  };
};

export const submitOrder = userId => {
  return dispatch => {
    const user ={
      userId: userId ? userId: null
    }
    return axios
      .put(`/api/cart/submit/user/`, user)
      .then(() => dispatch(getCreateOrders()));
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

export const createProduct = product => {
  return dispatch => {
    return axios
      .post('/api/products/', product)
      .then(response => response.data)
      .then(product => {
        dispatch(_createProduct(product));
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
export const getMe = () => (dispatch, getState) => {
  return axios
    .get('/auth/me')
    .then(res => res.data)
    .then(loggedInUser => {
      console.log('USER', loggedInUser);
      dispatch(_getMe(loggedInUser));
    })
    .then(() => dispatch(getCreateOrders()));
};

//authorizes user
export const login = credentials => dispatch => {
  return axios
    .put('/auth/login', credentials)
    .then(res => res.data)
    .then(loggedInUser => dispatch(getMe(loggedInUser)));
};

export const logout = () => dispatch => {
  return axios
    .delete('/auth/logout')
    .then(() => dispatch(_getMe({})))
    .catch(console.error.bind(console));
};


//---------------------------Images-------------------------------//



export const loadImages = () => {
  return dispatch => {
    return axios.get('/api/images/')
      .then(response => response.data)
      .then(images => dispatch(_loadImages(images)))
  };
};

export const createImage = (image) => {
  return dispatch => {
    return axios.post('/api/images/', image)
      .then(response => response.data)
      .then(image => { dispatch(_createImage(image)) })
  };
};

