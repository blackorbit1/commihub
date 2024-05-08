import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCommissions,
  addCommission,
  updateCommission as updateCommissionAction,
  deleteCommission as deleteCommissionAction,
  setLoading,
  setError,
} from './commissionSlice';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Thunks
export const fetchCommissions = createAsyncThunk('commission/fetchCommissions', async (_, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.get('/commissions');
    dispatch(setCommissions(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});

export const createCommission = createAsyncThunk('commission/createCommission', async ({ title, description }, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.post('/commissions', { title, description });
    dispatch(addCommission(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});

export const updateCommission = createAsyncThunk('commission/updateCommission', async ({ id, progress }, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.put(`/commissions/${id}`, { progress });
    dispatch(updateCommissionAction(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});

export const deleteCommission = createAsyncThunk('commission/deleteCommission', async (id, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    await api.delete(`/commissions/${id}`);
    dispatch(deleteCommissionAction(id));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});
