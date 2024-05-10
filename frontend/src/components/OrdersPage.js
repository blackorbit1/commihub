import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, CircularProgress, Chip, Button } from '@nextui-org/react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !isAuthenticated) return; // Check user is available

      try {
        const { data } = await axios.get(`http://localhost:4000/api/commissions/orders/${user.id}`);
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated]);

  return (
    <div className='flex flex-wrap gap-4 p-8'>
      {orders.map((order) => (
        <Card key={order.id} className="border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
           <CardHeader className='flex gap-3'>
            <Image
              alt={order.Commissioner.username}
              height={50}
              width={50}
              src={`https://cdn.discordapp.com/avatars/${order.Commissioner.discordId}/${order.Commissioner.avatar}.png`}
            />
            <div className='flex flex-col'>
              <p className='text-md'>{order.Commissioner.username}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="justify-center items-center pb-0">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}
              value={order.progress}
              strokeWidth={4}
              showValueLabel={true}
            />
          </CardBody>
          <CardBody className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "border-1 border-white/30",
                content: "text-white/90 text-small font-semibold",
              }}
              variant="bordered"
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
  );
};

export default OrdersPage;
