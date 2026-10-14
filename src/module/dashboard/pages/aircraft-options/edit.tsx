'use client';

import { Suspense } from 'react';

import AircraftOptionsEditForm from '../../components/aircraft-options-flow/AircraftOptionsEditForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

type TAircraftOptionsPageEditProps = {
  aircraftOptionsId: string;
};

export default function AircraftOptionsPageEdit({
  aircraftOptionsId,
}: Readonly<TAircraftOptionsPageEditProps>) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <AircraftOptionsEditForm aircraftOptionsId={aircraftOptionsId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
