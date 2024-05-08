import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commissions: [],
  loading: false,
  error: null,
};

const commissionSlice = createSlice({
  name: 'commission',
  initialState,
  reducers: {
    setCommissions: (state, action) => {
      state.commissions = action.payload;
    },
    addCommission: (state, action) => {
      state.commissions.push(action.payload);
    },
    updateCommission: (state, action) => {
      const index = state.commissions.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.commissions[index] = { ...state.commissions[index], ...action.payload };
      }
    },
    deleteCommission: (state, action) => {
      state.commissions = state.commissions.filter((c) => c.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCommissions,
  addCommission,
  updateCommission,
  deleteCommission,
  setLoading,
  setError,
} = commissionSlice.actions;
export default commissionSlice.reducer;
