import React from 'react';
import { User, Chip, Card, CardBody, CardFooter, Button } from '@nextui-org/react';

const OrderSummary = ({ commissioner, elements, dateRange, contact, paymentMethod, totalPrice, onOrderClick, isOrdering }) => {
  return (
    <Card className='w-[500px] h-[400px]'>
      <CardBody className='flex flex-col items-center gap-4'>
        <User
          avatarProps={{
            size: 'lg',
            src: `https://cdn.discordapp.com/avatars/${commissioner.discordId}/${commissioner.avatar}.png`,
          }}
          description={`Commissioner: ${commissioner.username}`}
          name={commissioner.username}
        />
        <div className='flex flex-col gap-2'>
          <b>Elements:</b>
          <ul>
            {elements.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
          <b>Date Range:</b>
          <p>{`${dateRange.start} to ${dateRange.end}`}</p>
          <b>Contact Details:</b>
          <ul>
            {Object.entries(contact).map(([key, value]) => (
              <li key={key}>{`${key}: ${value}`}</li>
            ))}
          </ul>
          <b>Payment Method:</b>
          <p>{paymentMethod}</p>
          <b>Total Price:</b>
          <Chip color='success' size='sm' variant='flat'>
            {totalPrice}€
          </Chip>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          isLoading={isOrdering}
          color='success'
          onPress={onOrderClick}
        >
          {isOrdering ? 'Commissionning...' : 'Commission'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
