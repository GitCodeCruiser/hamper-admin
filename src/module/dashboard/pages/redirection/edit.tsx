'use client';

import { Suspense } from 'react';

import RedirectionEditForm from '../../components/redirection/RedirectionEditForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function RedirectionPageEdit({ redirectionId }: { redirectionId: string }) {
  return (
    <DashboardHome>
      <SectionHeading title="Edit Redirection" />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <RedirectionEditForm redirectionId={redirectionId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
