import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommissions, createCommission, updateCommission, deleteCommission } from '../slices/commissionThunks';
import {
  Button,
  Card,
  Text,
  Badge,
  Grid,
} from '@nextui-org/react';

function Dashboard() {
  const dispatch = useDispatch();
  const { commissions, loading, error } = useSelector((state) => state.commission);

  useEffect(() => {
    dispatch(fetchCommissions());
  }, [dispatch]);

  const addSampleCommission = () => {
    dispatch(createCommission({ title: 'New Commission', description: 'Sample commission description' }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <p>Dashboard</p>
  );
}

export default Dashboard;
