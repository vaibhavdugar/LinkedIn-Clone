import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";

// middleware is an array of redux middleware functions
// configureStore is a part of redux toolkit which takes an object as an argument (earlier we used createStore from redux)

// when we dispatch an action, redux thunk middleware checks if the action is a function(thunk) or not. If it is a function, it calls the function with dispatch and getState as arguments.
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

export default store;
