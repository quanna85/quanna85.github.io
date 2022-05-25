import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import appReducer from './app/app.slice';

const reducer = combineReducers({ app: appReducer });

const store = configureStore({
  reducer,
});

export default store;
