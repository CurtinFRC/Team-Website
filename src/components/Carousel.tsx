import React, { useState, useEffect } from 'react';

const Carousel = ({ elements }) => {
  const [currentElement, setCurrentElement] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentElement(currentElement => (currentElement + 1) % elements.length);
      setTranslateValue(translateValue => translateValue - 100);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentElement, elements.length]);

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `translateY(${translateValue}%)`
        }}
      >
        {elements.map((element, index) => {
          return (
            <div key={index} style={{ height: '100%' }}>
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;