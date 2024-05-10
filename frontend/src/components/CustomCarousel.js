// frontend/src/components/CustomCarousel.js

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CustomCarousel = ({ slides, currentIndex, onSlideChange }) => {
  return (
    <Carousel
      selectedItem={currentIndex}
      onChange={onSlideChange}
      className='rounded-xl'
      showThumbs={false}
      showStatus={false}
    >
      {slides.map((slide, index) => (
        <div key={index}>{slide}</div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
