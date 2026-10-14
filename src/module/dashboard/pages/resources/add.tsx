'use client';

import { Suspense } from 'react';

import ResourcesAddForm from '../../components/resources/ResourcesAddForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachResourcesCategory } from '@/types/apps/resources/index.type';

type TResourcesPageAddProps = {
  resourcesCatData?: TEachResourcesCategory;
  resourcesCatId: string;
};

export default function ResourcesPageAdd({
  resourcesCatId,
  resourcesCatData,
}: TResourcesPageAddProps) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <ResourcesAddForm resourcesCatId={resourcesCatId} resourcesCatData={resourcesCatData} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
