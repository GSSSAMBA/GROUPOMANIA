// import React from 'react';
// import ReactDOM from 'react-dom/client';
// // import ReactDOM from 'react-dom';
// import App from './App';
// import './styles/index.scss';
// import { Provider } from 'react-redux';
// import { applyMiddleware, } from 'redux';
// import { configureStore, } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';



// import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger'

// const store = configureStore(
//   { reducer: rootReducer }, composeWithDevTools(applyMiddleware(thunk, logger))
// )

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );


// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { getUsers } from "./actions/users.actions";
// import { getPosts } from "./actions/post.actions";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(...middleware))
);

// store.dispatch(getUsers());
// store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);