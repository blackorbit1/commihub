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
    <div>
      <Text h1>Dashboard</Text>
      <Button onClick={addSampleCommission} variant="shadow" className="mb-6">
        Add Commission
      </Button>
      <Grid.Container gap={2}>
        {commissions.map((commission) => (
          <Grid key={commission.id} xs={12} sm={6} md={4}>
            <Card className="p-4">
              <Text h3>{commission.title}</Text>
              <Text>{commission.description}</Text>
              <Badge color="success" className="mt-2 mb-4">
                Progress: {commission.progress}%
              </Badge>
              <Button
                onClick={() => dispatch(updateCommission({ id: commission.id, progress: commission.progress + 10 }))}
                variant="shadow"
                className="mb-2"
              >
                Update Progress
              </Button>
              <Button
                onClick={() => dispatch(deleteCommission(commission.id))}
                variant="flat"
                color="danger"
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
}

export default Dashboard;
