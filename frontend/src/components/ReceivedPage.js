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

const ReceivedPage = () => {
  const [received, setReceived] = useState([]);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [details, setDetails] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/commissions/received/${user.id}`);
        setReceived(data);
      } catch (err) {
        console.error('Error fetching received:', err);
      }
    };

    fetchReceived();
  }, [user]);

  const fetchCommissionDetails = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/commissions/order/${id}`);
      setSelectedCommission(id);
      setDetails(data);
    } catch (err) {
      console.error('Error fetching commission details:', err);
    }
  };

  const updateCommissionDetails = async (field, value) => {
    if (!details) return;
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);

    try {
      await axios.post('http://localhost:4000/api/commissions/update', updatedDetails);
    } catch (err) {
      console.error('Error updating commission details:', err);
    }
  };

  const renderDetailsSection = () => {
    if (!details) return null;

    const { Client, progress, price, dateRange, paymentMethod, contact, referenceFiles, outputFiles, elements } = details;

    const handlePriceChange = (delta) => {
      updateCommissionDetails('price', price + delta);
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
            alt={Client.username}
            src={`https://cdn.discordapp.com/avatars/${Client.discordId}/${Client.avatar}.png`}
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
            onChange={(e) => updateCommissionDetails('price', parseFloat(e.target.value))}
          />
          <Button.Group>
            <Button onPress={() => handlePriceChange(-5)}>-5</Button>
            <Button onPress={() to handlePriceChange(5)}>+5</Button>
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
        {received.map((commission) => (
          <Card
            key={commission.id}
            className='max-w-[300px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500'
            onPress={() => fetchCommissionDetails(commission.id)}
          >
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
                value={commission.progress}
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
                {commission.price}€
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

export default ReceivedPage;
