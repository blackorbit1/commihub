import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User, Card, CardBody, Divider } from '@nextui-org/react';
import CommissionElement from '../components/CommissionElement';
import AccordionElement from '../components/AccordionElement';
import CustomButton from '../components/CustomButton';
import CustomDateRangePicker from '../components/DateRangePicker';
import { today, getLocalTimeZone } from '@internationalized/date';

const CommissionPage = () => {
  const { commissionerId } = useParams();
  const [commissioner, setCommissioner] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 7 }),
  });

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
        (id) =>
          !elements
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
    return elements.filter(
      (el) => (!el.parentsId || el.parentsId.length === 0) && (!el.childrensId || el.childrensId.length === 0),
    );
  };

  const handleOrder = () => {
    console.log('Order placed:', selectedElements);
  };

  const allElements = [...getSingleElements(), ...getParentElements()].sort((a, b) => a.id - b.id);

  if (!commissioner) return null;

  return (
    <div className='flex flex-col gap-4 p-8'>
      <User
        avatarProps={{ size: 'lg', src: `https://cdn.discordapp.com/avatars/${commissioner.discordId}/${commissioner.avatar}.png` }}
        description={`Commissioner: ${commissioner.username}`}
        name={commissioner.username}
      />
      <Divider className='my-4' />
      <div className='gap-2 grid grid-cols-2 sm:grid-cols-4'>
        {allElements.map((element) => {
          if (element.childrensId && element.childrensId.length > 0) {
            return (
              <AccordionElement
                key={element.id}
                element={element}
                childrenElements={getChildrenElements(element.id)}
                selectedElements={selectedElements.filter((id) =>
                  getChildrenElements(element.id).map((el) => el.id).includes(id),
                )}
                onChildrenChange={(ids) => handleChildrenChange(element.id, ids)}
                calculateTotalPrice={calculateTotalPrice}
              />
            );
          } else {
            return (
              <CommissionElement
                key={element.id}
                element={element}
                isSelected={selectedElements.includes(element.id)}
                onChange={() => handleElementChange(element.id)}
              />
            );
          }
        })}
      </div>
      <Card className='fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4'>
        <CardBody className='flex flex-col items-center gap-2'>
          <b>Total Price: {calculateTotalPrice()}€</b>
          <CustomDateRangePicker value={dateRange} setValue={setDateRange} />
          <CustomButton onPress={handleOrder} />
        </CardBody>
      </Card>
    </div>
  );
};

export default CommissionPage;
