import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User } from '@nextui-org/react';
import CommissionElement from '../components/CommissionElement';
import AccordionElement from '../components/AccordionElement';
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

  const handleChildrenChange = (parentId, childrenIds) => {
    setSelectedElements((prevSelected) => {
      const withoutParentChildren = prevSelected.filter(
        (id) => !elements
          .filter((el) => el.parentsId.includes(parentId))
          .some((child) => child.id === id),
      );
      return [...withoutParentChildren, ...childrenIds];
    });
  };

  const calculateTotalPrice = (parentId = null) => {
    if (parentId) {
      const parentElement = elements.find((el) => el.id === parentId);
      const childrenIds = parentElement.childrensId;
      return (
        parentElement.price +
        selectedElements
          .filter((id) => childrenIds.includes(id))
          .reduce((total, id) => {
            const child = elements.find((el) => el.id === id);
            return total + (child ? child.price : 0);
          }, 0)
      );
    }
    return selectedElements.reduce((total, elementId) => {
      const element = elements.find((el) => el.id === elementId);
      return total + (element ? element.price : 0);
    }, 0);
  };

  const getChildrenElements = (parentId) => {
    return elements.filter((el) => el.parentsId.includes(parentId));
  };

  const getParentElements = () => {
    return elements.filter((el) => el.childrensId && el.childrensId.length > 0);
  };

  const getSingleElements = () => {
    return elements.filter((el) => !el.parentsId || el.parentsId.length === 0);
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
      <div className='gap-4 grid'>
        {getSingleElements().map((element) => (
          <CommissionElement
            key={element.id}
            element={element}
            isSelected={selectedElements.includes(element.id)}
            onChange={() => handleElementChange(element.id)}
          />
        ))}
        {getParentElements().map((parentElement) => (
          <AccordionElement
            key={parentElement.id}
            element={parentElement}
            childrenElements={getChildrenElements(parentElement.id)}
            selectedElements={selectedElements.filter((id) =>
              getChildrenElements(parentElement.id).map((el) => el.id).includes(id),
            )}
            onChildrenChange={(ids) => handleChildrenChange(parentElement.id, ids)}
            calculateTotalPrice={calculateTotalPrice}
          />
        ))}
      </div>
      <div className='flex flex-col items-center gap-2 mt-4'>
        <b>Total Price: {calculateTotalPrice()}€</b>
        <CustomButton onPress={handleOrder} />
      </div>
    </div>
  );
};

export default CommissionPage;
