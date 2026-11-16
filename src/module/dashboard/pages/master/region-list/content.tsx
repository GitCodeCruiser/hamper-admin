'use client';

import { Suspense } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import RegionListContentForm from '@/module/dashboard/components/master/region-list/RegionListContentForm';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function RegionListContent({ regionListId }: { regionListId: string }) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <RegionListContentForm regionListId={regionListId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
