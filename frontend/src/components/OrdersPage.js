import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
  Button,
  User,
} from '@nextui-org/react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/commissions/orders/5678'); // Replace with actual clientId
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='gap-2 grid grid-cols-2 sm:grid-cols-4 p-8'>
      {orders.map((order) => (
        <Card key={order.id} className='w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500'>
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
          <CardFooter className='justify-center items-center pt-0'>
            <Chip
              classNames={{
                base: 'border-1 border-white/30',
                content: 'text-white/90 text-small font-semibold',
              }}
              variant='bordered'
            >
              {order.price}€
            </Chip>
            <Button variant='flat' color='default' radius='lg' size='sm'>
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OrdersPage;
