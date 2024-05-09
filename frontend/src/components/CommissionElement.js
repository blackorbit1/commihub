import React from 'react';
import { Checkbox, User, Chip, cn } from '@nextui-org/react';

const CommissionElement = ({ element, isSelected, onChange }) => {
  return (
    <Checkbox
      aria-label={element.name}
      classNames={{
        base: cn(
          'inline-flex w-full max-w-md bg-content1',
          'hover:bg-content2 items-center justify-start',
          'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary',
        ),
        label: 'w-full',
      }}
      isSelected={isSelected}
      onValueChange={onChange}
    >
      <div className='w-full flex justify-between gap-2'>
        <User
          avatarProps={{ size: 'md', src: element.icon }}
          description={element.description}
          name={element.name}
        />
        <div className='flex flex-col items-end gap-1'>
          <Chip color='success' size='sm' variant='flat'>
            {`${element.price}€`}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
};

export default CommissionElement;
