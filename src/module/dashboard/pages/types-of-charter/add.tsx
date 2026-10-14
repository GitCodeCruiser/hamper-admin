'use client';

import { Suspense } from 'react';

import TypesOfCharterAddForm from '../../components/types-of-charter/TypesOfCharterAddForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachTypesOfCharterCategory } from '@/types/apps/types-of-charter/index.type';

type TTypesOfCharterPageAddProps = {
  charterCatData: TEachTypesOfCharterCategory;
  charterCatId: string;
};

export default function TypesOfCharterPageAdd({
  charterCatId,
  charterCatData,
}: TTypesOfCharterPageAddProps) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <TypesOfCharterAddForm charterCatId={charterCatId} charterCatData={charterCatData} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
