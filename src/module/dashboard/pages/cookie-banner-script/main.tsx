'use client';

import { Suspense } from 'react';

import CookieBannerFormComp from '../../components/text-form/CookieBannerFormComp';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function CookieBannerScriptMain() {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <CookieBannerFormComp
              title="cookie-banner-script"
              labelName="Cookie Banner Script"
              slug={PageTypeValue.cms.allPages.pageSlug}
              pageName={PageTypeValue.cms.allPages.pageName}
              purpose={PurposeTypeValue.cms.allPages.cookieBannerScriptContent}
            />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
