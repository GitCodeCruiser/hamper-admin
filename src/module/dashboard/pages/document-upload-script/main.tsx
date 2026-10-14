'use client';

import { Suspense } from 'react';

import DocumentUploadScriptFormComp from '../../components/text-form/DocumentUploadScriptFormComp';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function DocumentUploadScriptMain() {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <DocumentUploadScriptFormComp
              title="document-upload-script"
              labelName="Document Upload Script"
              slug={PageTypeValue.cms.allPages.pageSlug}
              pageName={PageTypeValue.cms.allPages.pageName}
              purpose={PurposeTypeValue.cms.allPages.documentUploadScriptContent}
            />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
