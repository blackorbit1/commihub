import React from 'react';
import { CheckboxGroup } from '@nextui-org/react';
import CustomCheckbox from './CustomCheckbox';

const CustomCheckboxGroup = ({ elements, selectedElements, onChange }) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <CheckboxGroup
        className='gap-1'
        value={selectedElements}
        onChange={onChange}
        orientation='horizontal'
      >
        {elements.map((element) => (
          <CustomCheckbox key={element.id} value={element.id} price={element.price}>
            {element.name}
          </CustomCheckbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default CustomCheckboxGroup;
