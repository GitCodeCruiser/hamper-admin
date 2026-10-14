import React from 'react';

export type TSidebarItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
  children?: TSidebarItem[];
};

export type TDashboardHeaderProp = {
  headerTitle: React.ReactNode;
};

export type TDashboardLayoutData = {
  headerTitle?: React.ReactNode;
};
