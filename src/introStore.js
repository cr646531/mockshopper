// import { createStore, applyMiddleware } from 'redux';
// import loggerMiddleware from 'redux-logger';
// import thunk from 'redux-thunk';

// const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY";

// //------------------------------------------------------------------------------//

// const introReducer = (state = { introVisibility: true }, action) => {

//   const newState = Object.assign({}, state);

//   switch(action.type){
//     case TOGGLE_VISIBILITY:
//       console.log('here we go');
//       newState.introVisibility = !state.introVisibility;
//       break;
//   }

//   return newState;
// };

// export const store = createStore(introReducer, applyMiddleware(thunk, loggerMiddleware));

// //------------------------------------------------------------------------------//

// export const _toggleIntroVisibility = () => {
//   return {
//     type: TOGGLE_VISIBILITY
//   }
// };

// export const toggleIntroVisibility = () => {
//   return dispatch => _toggleIntroVisibility();
// }

// _toggleIntroVisibility();
