import React from 'react';
import { Accordion, AccordionItem, Avatar, AvatarGroup, Chip, cn } from '@nextui-org/react';
import CustomCheckboxGroup from './CustomCheckboxGroup';

const AccordionElement = ({
  element,
  childrenElements,
  selectedElements,
  onChildrenChange,
  calculateTotalPrice,
}) => {
  const childAvatars = childrenElements.map((child) => ({
    src: child.icon,
    name: child.name,
  }));

  return (
    <Accordion
      selectionMode='multiple'
      showDivider={false}
      className='inline-flex w-full max-w-md bg-content1 hover:bg-content2 cursor-pointer rounded-lg p-4 mb-4 border-2 border-transparent data-[open=true]:border-primary'
    >
      <AccordionItem
        key={element.id}
        aria-label={element.name}
        startContent={
          <AvatarGroup
            max={3}
            total={childAvatars.length}
            renderCount={(count) => (
              <p className='text-small text-foreground font-medium ms-2'>{count} choice</p>
            )}
          >
            {childAvatars.map((avatar, index) => (
              <Avatar key={index} src={avatar.src} />
            ))}
          </AvatarGroup>
        }
        title={element.name}
        subtitle={element.description}
      >
        <div className='flex justify-between'>
          <CustomCheckboxGroup
            elements={childrenElements}
            selectedElements={selectedElements}
            onChange={onChildrenChange}
          />
          <Chip color='success' size='sm' variant='flat'>
            {calculateTotalPrice(element.id)}€
          </Chip>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionElement;
