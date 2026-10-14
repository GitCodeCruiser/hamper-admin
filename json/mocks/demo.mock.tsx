import { ReactNode } from 'react';

import SimpleAreaChart from '@/components/DashboardComponnets/AllCharts/SimpleAreaChart';

export const dailyactiveUserData = [
  { value: 30 },
  { value: 35 },
  { value: 28 },
  { value: 40 },
  { value: 38 },
  { value: 32 },
  { value: 36 },
  { value: 30 },
  { value: 34 },
  { value: 38 },
  { value: 33 },
  { value: 36 },
  { value: 40 },
  { value: 37 },
  { value: 42 },
  { value: 38 },
  { value: 44 },
  { value: 50 },
  { value: 47 },
  { value: 55 },
  { value: 52 },
  { value: 58 },
  { value: 62 },
  { value: 70 },
];

export const newUserData = [
  { value: 70 },
  { value: 62 },
  { value: 58 },
  { value: 52 },
  { value: 55 },
  { value: 47 },
  { value: 50 },
  { value: 44 },
  { value: 38 },
  { value: 42 },
  { value: 37 },
  { value: 40 },
  { value: 36 },
  { value: 30 },
  { value: 35 },
  { value: 28 },
  { value: 40 },
  { value: 38 },
  { value: 32 },
  { value: 36 },
  { value: 30 },
  { value: 34 },
  { value: 38 },
  { value: 33 },
];

export type TCommonWidgetData = {
  dataTitle: string;
  value: string;
  change?: string;
  hasLive?: boolean;
  positive?: boolean;
  rightContent?: ReactNode;
};

export const stats: TCommonWidgetData[] = [
  {
    dataTitle: 'Daily Active Users',
    value: '2,450',
    change: '+5.2%',
    positive: true,
    rightContent: (
      <SimpleAreaChart
        data={dailyactiveUserData}
        width="221px"
        height="73px"
        strokeColor="#30B935"
        gradientColor="#30B935"
        className="res-width"
      />
    ),
  },
  {
    dataTitle: 'Monthly Active Users',
    value: '18,200',
    change: '+8.7%',
    positive: true,
    rightContent: (
      <SimpleAreaChart
        data={dailyactiveUserData}
        width="221px"
        height="73px"
        strokeColor="#30B935"
        gradientColor="#30B935"
        className="res-width"
      />
    ),
  },
  {
    dataTitle: 'Real time Active Users',
    value: '128',
    hasLive: true,
  },
  {
    dataTitle: 'New Users',
    value: '530',
    change: '-12.5%',
    positive: false,
    rightContent: (
      <SimpleAreaChart
        data={newUserData}
        width="221px"
        height="73px"
        strokeColor="#DC2B31"
        gradientColor="#DC2B31"
        className="res-width"
      />
    ),
  },
  {
    dataTitle: 'Total Sessions',
    value: '36,500',
    change: '+7.4%',
    positive: true,
  },
  {
    dataTitle: 'Avg Engagement Time',
    value: '5m 12s',
    change: '+9.1%',
    positive: true,
  },
];

export const usersData: TCommonWidgetData[] = [
  {
    dataTitle: 'Real time Active Users',
    value: '128',
    hasLive: true,
  },

  {
    dataTitle: 'New Users',
    value: '530',
    change: '-12.5%',
    positive: false,
    rightContent: (
      <SimpleAreaChart
        data={newUserData}
        width="221px"
        height="73px"
        strokeColor="#DC2B31"
        gradientColor="#DC2B31"
        className="res-width"
      />
    ),
  },
  {
    dataTitle: 'Returning Users',
    value: '3,980',
    change: '+4.1%',
    positive: true,
    rightContent: (
      <SimpleAreaChart
        data={newUserData}
        width="221px"
        height="73px"
        strokeColor="#DC2B31"
        gradientColor="#DC2B31"
        className="res-width"
      />
    ),
  },
];

export const totalPageData = [
  {
    page: '/home',
    pageView: 8200,
  },
  {
    page: '/jobs',
    pageView: 5750,
  },
  {
    page: '/marketplace',
    pageView: 4300,
  },
  {
    page: '/content',
    pageView: 3900,
  },
  {
    page: '/login',
    pageView: 2100,
  },
];
