// Redux store setup
import { configureStore } from '@reduxjs/toolkit';
import commissionReducer from './slices/commissionSlice';

const store = configureStore({
  reducer: {
    commission: commissionReducer,
  },
});

export default store;
