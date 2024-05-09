import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Card,
  CardBody,
  Divider,
} from '@nextui-org/react';
import CommissionElement from '../components/CommissionElement';
import AccordionElement from '../components/AccordionElement';
import CustomButton from '../components/CustomButton';
import CustomDateRangePicker from '../components/DateRangePicker';
import Backgrounds from '../components/Backgrounds';
import DescriptionTextarea from '../components/DescriptionTextarea';
import FileDropzone from '../components/FileDropzone';
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

  const getCategories = () => {
    return elements.filter((el) => el.type === 'category');
  };

  const getSingleElements = () => {
    return elements.filter(
      (el) =>
        el.type === 'item' &&
        (!el.parentsId || el.parentsId.length === 0) &&
        (!el.childrensId || el.childrensId.length === 0),
    );
  };

  const getItemsByCategory = (categoryId) => {
    return elements.filter((el) => el.parentsId.includes(categoryId));
  };

  const handleOrder = () => {
    console.log('Order placed:', selectedElements);
  };

  const categories = getCategories();
  const allElements = [...getSingleElements()].sort((a, b) => a.id - b.id);

  if (!commissioner) return null;

  return (
    <div className='relative'>
      <Backgrounds />
      <div className='relative z-10 flex flex-col gap-4 p-8'>
        <User
          avatarProps={{
            size: 'lg',
            src: `https://cdn.discordapp.com/avatars/${commissioner.discordId}/${commissioner.avatar}.png`,
          }}
          description={`Commissioner: ${commissioner.username}`}
          name={commissioner.username}
        />
        <Divider className='my-4' />
        {categories.map((category) => (
          <div key={category.id}>
            <User
              avatarProps={{
                size: 'md',
                src: category.icon,
              }}
              description={category.description}
              name={category.name}
            />
            <Divider className='my-4' />
            <div className='gap-2 grid grid-cols-2 sm:grid-cols-4'>
              {getItemsByCategory(category.id).map((element) => {
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
            <Divider className='my-4' />
          </div>
        ))}
        <DescriptionTextarea />
        <FileDropzone />
        <div className='gap-2 grid grid-cols-2 sm:grid-cols-4'>
          {allElements.map((element) => (
            <CommissionElement
              key={element.id}
              element={element}
              isSelected={selectedElements.includes(element.id)}
              onChange={() => handleElementChange(element.id)}
            />
          ))}
        </div>
        <Card
          isBlurred
          className='fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4'
        >
          <CardBody className='flex flex-col items-center gap-2'>
            <b>Total Price: {calculateTotalPrice()}€</b>
            <CustomDateRangePicker value={dateRange} setValue={setDateRange} />

            <CustomButton onPress={handleOrder} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CommissionPage;
