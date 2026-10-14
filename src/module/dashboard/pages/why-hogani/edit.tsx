'use client';

import { Suspense } from 'react';

import WhyHoganiEditForm from '../../components/why-hogani-flow/WhyHoganiEditForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

type TWhyHoganiPageEditProps = {
  whyHoganiId: string;
};

export default function WhyHoganiPageEdit({ whyHoganiId }: Readonly<TWhyHoganiPageEditProps>) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <WhyHoganiEditForm whyHoganiId={whyHoganiId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
