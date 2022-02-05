import React, { useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import uuidv4 from 'uuid';
import { config } from 'react-spring';

function CarouselSell() {
  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.slow,
  });

  const slides = [
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/801/?random" alt="1" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/802/?random" alt="2" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/600/803/?random" alt="3" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/500/?random" alt="4" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/804/?random" alt="5" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/500/800/?random" alt="6" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/600/?random" alt="7" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/805/800/?random" alt="8" />,
    },
  ];

  return (
    <>
      <div style={{ width: '80%', height: '500px', margin: '0 auto' }}>
        <Carousel
          slides={slides}
          goToSlide={state.goToSlide}
          offsetRadius={state.offsetRadius}
          animationConfig={state.config}
          autoPlay
        />
        <div
          style={{
            margin: '0 auto',
            marginTop: '2rem',
            width: '50%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <button
              type="button"
              onClick={() => {
                setState({ ...state, goToSlide: state.goToSlide - 1 });
              }}
            >
              Left Arrow
            </button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <button
              type="button"
              onClick={() => {
                setState({ ...state, goToSlide: state.goToSlide + 1 });
              }}
            >
              Right Arrow
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarouselSell;
