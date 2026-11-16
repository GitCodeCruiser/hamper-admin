'use client';

import { Suspense } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import RegionListFaqForm from '@/module/dashboard/components/master/region-list/RegionListFaqForm';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function RegionListFaq({ regionListId }: { regionListId: string }) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <RegionListFaqForm regionListId={regionListId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
