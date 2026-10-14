'use client';

import { Suspense } from 'react';

import ResourcesFaqForm from '../../components/resources/ResourcesFaqForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function ResourcesFaq({
  resourcesCatId,
  resourcesId,
}: {
  resourcesCatId: string;
  resourcesId: string;
}) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <ResourcesFaqForm resourcesCatId={resourcesCatId} resourcesId={resourcesId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
