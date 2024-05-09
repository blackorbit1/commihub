import React from 'react';
import { Textarea } from '@nextui-org/react';

const DescriptionTextarea = () => {
  return (
    <Textarea
      variant='faded'
      label='Description'
      placeholder='Enter your description'
      description='Enter a concise description of your project.'
      className='max-w-xs'
    />
  );
};

export default DescriptionTextarea;
