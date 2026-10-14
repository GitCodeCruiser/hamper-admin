'use client';

import { Suspense } from 'react';

import MembershipPlansForm from '../components/membership/MembershipPlansForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import HomePageTitleAndSubtitleComp from '@/module/dashboard/components/cms/homepage/HomePageTitleAndSubtitleComp';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function MembershipPlansPage() {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <HomePageTitleAndSubtitleComp
              labelName="Membership"
              slug={PageTypeValue.cms.homepage.pageSlug}
              pageName={PageTypeValue.cms.homepage.pageName}
              purpose={PurposeTypeValue.cms.homepage.homepageMembershipData}
            />

            <MembershipPlansForm slug={PageTypeValue.cms.homepage.pageSlug} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
