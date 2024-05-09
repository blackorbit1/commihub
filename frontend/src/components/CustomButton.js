import React, { useRef } from 'react';
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';

const CustomButton = ({ onPress }) => {
  const buttonRef = useRef(null);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onPress();
  };

  return (
    <Button
      ref={buttonRef}
      disableRipple
      className='relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[""] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0'
      size='lg'
      onPress={handleConfetti}
    >
      Order
    </Button>
  );
};

export default CustomButton;
