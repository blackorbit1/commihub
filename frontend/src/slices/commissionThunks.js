import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCommissions,
  addCommission,
  updateCommission as updateCommissionAction,
  deleteCommission as deleteCommissionAction,
  setLoading,
  setError,
} from './commissionSlice';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// GraphQL Queries & Mutations
const GET_COMMISSIONS = gql`
  query {
    commissions {
      id
      title
      description
      progress
    }
  }
`;

const ADD_COMMISSION = gql`
  mutation ($title: String!, $description: String!) {
    addCommission(title: $title, description: $description) {
      id
      title
      description
      progress
    }
  }
`;

const UPDATE_COMMISSION = gql`
  mutation ($id: ID!, $progress: Int!) {
    updateCommission(id: $id, progress: $progress) {
      id
      title
      description
      progress
    }
  }
`;

const DELETE_COMMISSION = gql`
  mutation ($id: ID!) {
    deleteCommission(id: $id)
  }
`;

// Thunks
export const fetchCommissions = createAsyncThunk('commission/fetchCommissions', async (_, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const { data } = await client.query({ query: GET_COMMISSIONS });
    dispatch(setCommissions(data.commissions));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});

export const createCommission = createAsyncThunk('commission/createCommission', async ({ title, description }, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const { data } = await client.mutate({ mutation: ADD_COMMISSION, variables: { title, description } });
    dispatch(addCommission(data.addCommission));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});

export const updateCommission = createAsyncThunk('commission/updateCommission', async ({ id, progress }, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const { data } = await client.mutate({ mutation: UPDATE_COMMISSION, variables: { id, progress } });
    dispatch(updateCommissionAction(data.updateCommission));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});

export const deleteCommission = createAsyncThunk('commission/deleteCommission', async (id, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    await client.mutate({ mutation: DELETE_COMMISSION, variables: { id } });
    dispatch(deleteCommissionAction(id));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});
