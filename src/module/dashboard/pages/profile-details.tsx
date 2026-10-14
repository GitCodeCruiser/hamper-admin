'use client';

import { Suspense } from 'react';

import NotificationSetting from '../components/NotificationSetting';
import ProfileDetailsForm from '../components/ProfileDetailsForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function DashboardProfileDetails() {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <NotificationSetting />
          <ProfileDetailsForm />
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
