import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Card,
  CardBody,
  Divider,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
} from '@nextui-org/react';
import CommissionElement from '../components/CommissionElement';
import AccordionElement from '../components/AccordionElement';
import CustomCarousel from '../components/CustomCarousel';
import Backgrounds from '../components/Backgrounds';
import DescriptionTextarea from '../components/DescriptionTextarea';
import FileDropzone from '../components/FileDropzone';
import OrderSummary from '../components/OrderSummary';
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [contactMethods, setContactMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [contactDetails, setContactDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false);

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

  const handleOrderClick = async () => {
    setIsOrdering(true);
    const orderData = {
      commissionerId: commissioner.id,
      clientId: '5678', // Example clientId, replace with actual userId
      elements: selectedElements,
      dateRange,
      contact: contactDetails,
      paymentMethod,
      price: totalPrice,
    };

    try {
      const { data } = await axios.post('http://localhost:4000/api/commissions/order', orderData);
      console.log('Order successful:', data);
      setIsOrdering(false);
      setCarouselIndex(carouselIndex + 1); // Slide to success page
    } catch (err) {
      console.error('Error creating order:', err);
      setIsOrdering(false);
    }
  };

  const allElements = [...getSingleElements()].sort((a, b) => a.id - b.id);

  const updatePrice = () => setTotalPrice(calculateTotalPrice());

  useEffect(() => updatePrice(), [selectedElements]);

  const slides = [
    <Card
      isBlurred
      className='transition ease-out duration-300 fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 w-[500px] h-[400px]'
    >
      <CardBody className='flex flex-col items-center gap-2'>
        <DescriptionTextarea />
        <FileDropzone />
        <b>Total Price: {totalPrice}€</b>
        <Button onPress={() => setCarouselIndex(1)}>Next</Button>
      </CardBody>
    </Card>,
    <Card
      isBlurred
      className='transition ease-out duration-300 fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 w-[500px] h-[400px]'
    >
      <CardBody className='flex flex-col items-center gap-2'>
        <CheckboxGroup
          label='Select contact methods'
          color='warning'
          value={contactMethods}
          onValueChange={setContactMethods}
        >
          <Checkbox value='email'>Email</Checkbox>
          <Checkbox value='discord'>Discord</Checkbox>
        </CheckboxGroup>
        {contactMethods.includes('email') && (
          <Input
            isRequired
            type='email'
            label='Email'
            className='max-w-xs'
            onChange={(e) => setContactDetails((prev) => ({ ...prev, email: e.target.value }))}
          />
        )}
        {contactMethods.includes('discord') && (
          <Input
            isRequired
            label='Discord Username'
            className='max-w-xs'
            onChange={(e) => setContactDetails((prev) => ({ ...prev, discord: e.target.value }))}
          />
        )}
        <CheckboxGroup
          label='Select payment methods'
          color='warning'
          value={[paymentMethod]}
          onValueChange={(values) => setPaymentMethod(values[0])}
        >
          <Checkbox value='paypal'>Paypal</Checkbox>
          <Checkbox value='bank'>Bank Transfer</Checkbox>
        </CheckboxGroup>
        <Button onPress={() => setCarouselIndex(0)}>Back</Button>
        <Button onPress={() => setCarouselIndex(2)}>Next</Button>
      </CardBody>
    </Card>,
    <OrderSummary
      commissioner={commissioner}
      elements={selectedElements}
      dateRange={dateRange}
      contact={contactDetails}
      paymentMethod={paymentMethod}
      totalPrice={totalPrice}
      onOrderClick={handleOrderClick}
      isOrdering={isOrdering}
    />,
  ];

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
        {getCategories().map((category) => (
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
        <CustomCarousel slides={slides} currentIndex={carouselIndex} onSlideChange={setCarouselIndex} />
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
      </div>
    </div>
  );
};

export default CommissionPage;
