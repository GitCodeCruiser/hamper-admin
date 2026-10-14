'use client';

import { Suspense } from 'react';

import TravelResourcesEditForm from '../../components/travel-resources-flow/TravelResourcesEditForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

type TTravelResourcesPageEditProps = {
  travelResourcesId: string;
};

export default function TravelResourcesPageEdit({
  travelResourcesId,
}: Readonly<TTravelResourcesPageEditProps>) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <TravelResourcesEditForm travelResourcesId={travelResourcesId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
