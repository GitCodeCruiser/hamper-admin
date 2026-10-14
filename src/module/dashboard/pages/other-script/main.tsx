'use client';

import { Suspense } from 'react';

import OtherScriptFormComp from '../../components/text-form/OtherScriptFormComp';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function OtherScriptMain() {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <OtherScriptFormComp
              title="other-script"
              labelName="Other Script"
              slug={PageTypeValue.cms.allPages.pageSlug}
              pageName={PageTypeValue.cms.allPages.pageName}
              purpose={PurposeTypeValue.cms.allPages.otherScriptContent}
            />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
