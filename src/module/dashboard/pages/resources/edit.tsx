'use client';

import { Suspense } from 'react';

import ResourcesEditForm from '../../components/resources/ResourcesEditForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachResourcesCategory } from '@/types/apps/resources/index.type';

type TResourcesPageEditProps = {
  resourcesCatId: string;
  resourcesId: string;
  resourcesCatData?: TEachResourcesCategory;
};

export default function ResourcesPageEdit({
  resourcesId,
  resourcesCatId,
  resourcesCatData,
}: Readonly<TResourcesPageEditProps>) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <ResourcesEditForm
              resourcesId={resourcesId}
              resourcesCatId={resourcesCatId}
              resourcesCatData={resourcesCatData}
            />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
