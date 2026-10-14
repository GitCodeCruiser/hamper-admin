'use client';

import { Suspense } from 'react';

import TextFormComp from '../../components/text-form/TextFormComp';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function RobotsTextMain() {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <TextFormComp
              title="robots"
              labelName="Robots.txt file"
              slug={PageTypeValue.cms.allPages.pageSlug}
              pageName={PageTypeValue.cms.allPages.pageName}
              purpose={PurposeTypeValue.cms.allPages.robotsTextContent}
            />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
