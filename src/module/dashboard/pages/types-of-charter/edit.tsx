'use client';

import { Suspense } from 'react';

import TypesOfCharterEditForm from '../../components/types-of-charter/TypesOfCharterEditForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachTypesOfCharterCategory } from '@/types/apps/types-of-charter/index.type';

type TTypesOfCharterPageEditProps = {
  charterCatId: string;
  charterId: string;
  charterCatData: TEachTypesOfCharterCategory;
};

export default function TypesOfCharterPageEdit({
  charterId,
  charterCatId,
  charterCatData,
}: Readonly<TTypesOfCharterPageEditProps>) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <TypesOfCharterEditForm
              charterId={charterId}
              charterCatId={charterCatId}
              charterCatData={charterCatData}
            />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
