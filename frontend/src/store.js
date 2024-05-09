import { configureStore } from '@reduxjs/toolkit';
import commissionReducer from './slices/commissionSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    commission: commissionReducer,
    auth: authReducer,
  },
});

export default store;
