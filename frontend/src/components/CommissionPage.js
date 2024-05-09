import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User } from '@nextui-org/react';
import CommissionElement from '../components/CommissionElement';
import CustomButton from '../components/CustomButton';

const CommissionPage = () => {
  const { commissionerId } = useParams();
  const [commissioner, setCommissioner] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);

  useEffect(() => {
    const fetchCommissioner = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/user/${commissionerId}`);
        setCommissioner(data);
      } catch (err) {
        console.error('Error fetching commissioner:', err);
      }
    };

    const fetchElements = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/commissions/elements/${commissionerId}`,
        );
        setElements(data);
      } catch (err) {
        console.error('Error fetching elements:', err);
      }
    };

    fetchCommissioner();
    fetchElements();
  }, [commissionerId]);

  const handleElementChange = (elementId) => {
    setSelectedElements((prevSelected) =>
      prevSelected.includes(elementId)
        ? prevSelected.filter((id) => id !== elementId)
        : [...prevSelected, elementId],
    );
  };

  const calculateTotalPrice = () => {
    return selectedElements.reduce((total, elementId) => {
      const element = elements.find((el) => el.id === elementId);
      return total + (element ? element.price : 0);
    }, 0);
  };

  const handleOrder = () => {
    console.log('Order placed:', selectedElements);
  };

  if (!commissioner) return null;

  return (
    <div className='flex flex-col gap-4 p-8'>
      <User
        avatarProps={{ size: 'lg', src: `https://cdn.discordapp.com/avatars/${commissioner.discordId}/${commissioner.avatar}.png` }}
        description={`Commissioner: ${commissioner.username}`}
        name={commissioner.username}
      />
      <div className='gap-2 grid grid-cols-2 sm:grid-cols-4'>
        {elements.map((element) => (
          <CommissionElement
            key={element.id}
            element={element}
            isSelected={selectedElements.includes(element.id)}
            onChange={() => handleElementChange(element.id)}
          />
        ))}
      </div>
      <div className='flex flex-col items-end gap-2 mt-4'>
        <b>Total Price: {calculateTotalPrice()}€</b>
        <CustomButton onPress={handleOrder} />
      </div>
    </div>
  );
};

export default CommissionPage;
