'use client';

import { Stack } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import type { Options } from '@splidejs/splide';

import { stats } from '../../../../json/mocks/demo.mock';
import CommonWidget from '../CommonWidget';

const StatWidgetSlider = () => {
  const options: Options = {
    type: 'slide',
    perMove: 1,
    arrows: false,
    pagination: false,
    gap: '20px',
    perPage: 4,
    drag: false,
    swipe: false,

    breakpoints: {
      1199: {
        perPage: 2.5,
        gap: '10px',
        drag: true,
        swipe: true,
        pagination: true,
      },
      899: {
        perPage: 2,
        gap: '16px',
        drag: true,
        swipe: true,
        pagination: true,
      },
      599: {
        perPage: 1,
        gap: '12px',
        drag: true,
        swipe: true,
        pagination: true,
      },
    },
  };

  return (
    <>
      <Stack direction="row" flexWrap="wrap" className="stat-widget-stack">
        {stats.map((item, index) => (
          <CommonWidget className="stat-items" {...item} key={index} />
        ))}
      </Stack>
      <Splide options={options} aria-label="Homepage Slider" className="stat-splide">
        {stats.map((item, index) => (
          <SplideSlide key={index}>
            <CommonWidget className="stat-items" {...item} />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default StatWidgetSlider;
