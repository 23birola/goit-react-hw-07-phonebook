// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
// import { rootReducer } from "../reducers/rootReducer";
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import filter from '../slices/filter-slice';
import contacts from '../slices/contacts-slice';
// import logger from 'redux-logger';

// const store = createStore(rootReducer, devToolsEnhancer());

export const rootReducer = combineReducers({
  contacts,
  filter,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
