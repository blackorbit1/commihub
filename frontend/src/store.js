import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import commissionReducer from './slices/commissionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    commission: commissionReducer,
  },
});

export default store;
