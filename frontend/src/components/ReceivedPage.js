import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react';

const ReceivedPage = () => {
  const [received, setReceived] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReceived = async () => {
      if (!user || !isAuthenticated) return; // Check if user is available

      try {
        const { data } = await axios.get(`http://localhost:4000/api/commissions/received/${user.id}`);
        setReceived(data);
      } catch (err) {
        console.error('Error fetching received:', err);
      }
    };

    fetchReceived();
  }, [user, isAuthenticated]);

  return (
    <div className='flex flex-wrap gap-4 p-8'>
      {received.map((commission) => (
        <Card key={commission.id} className='max-w-[400px]'>
          <CardHeader className='flex gap-3'>
            <Image
              alt={commission.Client.username}
              height={40}
              radius='sm'
              src={`https://cdn.discordapp.com/avatars/${commission.Client.discordId}/${commission.Client.avatar}.png`}
              width={40}
            />
            <div className='flex flex-col'>
              <p className='text-md'>{commission.Client.username}</p>
              <p className='text-small text-default-500'>{commission.Client.email}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Total Price: {commission.price}€</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link href={`/received/${commission.id}`}>Details</Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ReceivedPage;
