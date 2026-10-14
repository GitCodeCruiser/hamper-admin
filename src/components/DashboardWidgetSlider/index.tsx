'use client';

import { Box, BoxProps, styled } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import type { Options } from '@splidejs/splide';

import assest from '../../../json/assest';
import { CustomSize } from '../SIngleComponent/CustomViewSize';
import StatCard from '../SIngleComponent/StatCard';

const featuredslides = [
  {
    title: 'Total Leads',
    count: '2546',
    icon: assest.stats.leads,
  },
  {
    title: 'New Inquiries',
    count: '564',
    icon: assest.stats.inquires,
  },
  {
    title: 'Pending Quotes',
    count: '234',
    icon: assest.stats.calender,
  },
  {
    title: 'Quotes Sent',
    count: '365',
    icon: assest.stats.mail,
  },
  {
    title: 'Active Deals',
    count: '152',
    icon: assest.stats.deals,
  },
];

const DashboardWidgetSlider = ({ ...rest }: BoxProps) => {
  const options: Options = {
    type: 'slide',
    perMove: 1,
    arrows: false,
    pagination: false,
    gap: CustomSize(14),
    perPage: 5,
    drag: false,
    swipe: false,

    breakpoints: {
      1439: {
        perPage: 4,
        gap: '14px',
        drag: true,
        swipe: true,
        pagination: true,
      },
      1199: {
        perPage: 3,
        gap: '14px',
        drag: true,
        swipe: true,
        pagination: true,
      },
      899: {
        perPage: 2,
        gap: '14px',
        drag: true,
        swipe: true,
        pagination: true,
      },
      599: {
        perPage: 1,
        gap: '14px',
        drag: true,
        swipe: true,
        pagination: true,
      },
    },
  };

  return (
    <CardSloderWrapper {...rest}>
      <Splide options={options} aria-label="Homepage Slider">
        {featuredslides.map((slide, index) => (
          <SplideSlide key={index}>
            <StatCard {...slide} />
          </SplideSlide>
        ))}
      </Splide>
    </CardSloderWrapper>
  );
};

export default DashboardWidgetSlider;

export const CardSloderWrapper = styled(Box)`
  .splide__pagination {
    position: unset !important;
    margin-top: 15px !important;

    .splide__pagination__page {
      background-color: ${({ theme }) => theme.palette.primary.main} !important;

      &.is-active {
        background-color: ${({ theme }) => theme.palette.secondary.main} !important;
      }
    }
  }
`;
