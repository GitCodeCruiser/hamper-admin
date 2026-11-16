'use client';

import { Suspense } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import TailNumberForm from '@/module/dashboard/components/tail-number/TailNumberForm';
import { tailListUrl } from '@/module/dashboard/pages/tail-number/list';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

/** Add (no tailNumberId) or edit a tail number. `aircraftId` = opened from that aircraft's list */
export default function TailNumberFormPage({
  tailNumberId,
  aircraftId,
}: Readonly<{ tailNumberId?: string; aircraftId?: string }>) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox sx={{ backgroundColor: '#6b0f1aeb' }}>
            <TailNumberForm
              tailNumberId={tailNumberId}
              aircraftId={aircraftId}
              returnTo={tailListUrl(aircraftId)}
            />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
