import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [commissioners, setCommissioners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommissioners = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/user/commissioners');
        setCommissioners(data);
      } catch (error) {
        console.error('Error fetching commissioners:', error);
      }
    };

    fetchCommissioners();
  }, []);

  return (
    <div className='gap-2 grid grid-cols-2 sm:grid-cols-4'>
      {commissioners.map((commissioner) => (
        <Card
          shadow='sm'
          key={commissioner.id}
          isPressable
          onPress={() => navigate(`/commission/${commissioner.id}`)}
        >
          <CardBody className='overflow-visible p-0'>
            <Image
              shadow='sm'
              radius='lg'
              width='100%'
              alt={commissioner.username}
              className='w-full object-cover h-[140px]'
              src={`https://cdn.discordapp.com/avatars/${commissioner.discordId}/${commissioner.avatar}.png`}
            />
          </CardBody>
          <CardFooter className='text-small justify-between'>
            <b>{commissioner.username}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Home;
