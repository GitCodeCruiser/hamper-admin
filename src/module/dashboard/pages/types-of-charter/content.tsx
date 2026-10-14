'use client';

import { Suspense } from 'react';

import TypesOfCharterContentForm from '../../components/types-of-charter/TypesOfCharterContentForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function TypesOfCharterContent({
  charterCatId,
  charterId,
}: {
  charterCatId: string;
  charterId: string;
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
            <TypesOfCharterContentForm charterCatId={charterCatId} charterId={charterId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
