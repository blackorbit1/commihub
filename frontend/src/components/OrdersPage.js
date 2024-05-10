import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  CircularProgress,
  Chip,
  Button,
  Input,
} from '@nextui-org/react';
import BorderedTreeView from './CommissionTreeView';
import { Calendar } from '@mantine/dates';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [details, setDetails] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !isAuthenticated) return;

      try {
        const { data } = await axios.get(`http://localhost:4000/api/commissions/orders/${user.id}`);
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated]);

  const fetchOrderDetails = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/commissions/order/${id}`);
      setSelectedOrder(id);
      setDetails(data);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  const updateOrderDetails = async (field, value) => {
    if (!details) return;
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);

    try {
      await axios.post('http://localhost:4000/api/commissions/update', updatedDetails);
    } catch (err) {
      console.error('Error updating order details:', err);
    }
  };

  const renderDetailsSection = () => {
    if (!details) return null;

    const { Commissioner, progress, price, dateRange, paymentMethod, contact, referenceFiles, outputFiles, elements } = details;

    const handlePriceChange = (delta) => {
      updateOrderDetails('price', price + delta);
    };

    return (
      <div className='flex gap-4 p-8 border-t mt-4'>
        <div className='flex-1'>
          <CircularProgress
            classNames={{
              svg: 'w-36 h-36 drop-shadow-md',
              indicator: 'stroke-primary',
              track: 'stroke-primary/10',
              value: 'text-3xl font-semibold text-primary',
            }}
            value={progress}
            strokeWidth={4}
            showValueLabel={true}
          />
          <Image
            alt={Commissioner.username}
            src={`https://cdn.discordapp.com/avatars/${Commissioner.discordId}/${Commissioner.avatar}.png`}
            height={50}
            width={50}
          />
          <Divider orientation='horizontal' />
          <BorderedTreeView elements={elements} validatedElements={details.validatedElements} />
        </div>
        <Divider orientation='vertical' />
        <div className='flex-1'>
          <Calendar value={new Date(dateRange.start)} />
          <Divider orientation='horizontal' />
          <Input
            type='number'
            label='Change Price'
            value={price}
            onChange={(e) => updateOrderDetails('price', parseFloat(e.target.value))}
          />
          <Button.Group>
            <Button onPress={() => handlePriceChange(-5)}>-5</Button>
            <Button onPress={() => handlePriceChange(5)}>+5</Button>
          </Button.Group>
          <Divider orientation='horizontal' />
          <p>Payment Method: {paymentMethod}</p>
          <p>Email: {contact.email}</p>
          <p>Discord: {contact.discord}</p>
          <Divider orientation='horizontal' />
          <Chip color='success' variant='bordered'>
            {price}€
          </Chip>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-4 p-8'>
        {orders.map((order) => (
          <Card
            key={order.id}
            className='max-w-[300px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500'
            onPress={() => fetchOrderDetails(order.id)}
          >
            <CardHeader className='flex gap-3'>
              <Image
                alt={order.Commissioner.username}
                height={40}
                radius='sm'
                src={`https://cdn.discordapp.com/avatars/${order.Commissioner.discordId}/${order.Commissioner.avatar}.png`}
                width={40}
              />
              <div className='flex flex-col'>
                <p className='text-md'>{order.Commissioner.username}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className='justify-center items-center pb-0'>
              <CircularProgress
                classNames={{
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'stroke-white',
                  track: 'stroke-white/10',
                  value: 'text-3xl font-semibold text-white',
                }}
                value={order.progress}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardBody className='justify-center items-center pt-0'>
              <Chip
                classNames={{
                  base: 'border-1 border-white/30',
                  content: 'text-white/90 text-small font-semibold',
                }}
                variant='bordered'
              >
                {order.price}€
              </Chip>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button>Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {renderDetailsSection()}
    </div>
  );
};

export default OrdersPage;
