'use client';

import { Suspense } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import RegionListForm from '@/module/dashboard/components/master/region-list/RegionListForm';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function RegionListPageEdit({ regionListId }: { regionListId: string }) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <RegionListForm regionListId={regionListId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
