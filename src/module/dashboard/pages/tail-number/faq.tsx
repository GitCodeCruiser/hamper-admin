'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import { useTailNumberGet } from '@/api/hooks/tail-number/hooks';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import NewFaqContent from '@/module/dashboard/components/cms/newFaqContent/NewFaqContent';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

/** FAQ purpose prefix for tail numbers (the tail number id is appended) */
export const TAIL_NUMBER_FAQ_PURPOSE_PREFIX = 'tail-number';

const TailNumberFaqContent = ({ tailNumberId }: { tailNumberId: string }) => {
  const theme = useTheme();
  const router = useRouter();
  const { data: tail, isLoading } = useTailNumberGet({ id: tailNumberId });

  if (isLoading) return <PageLoader wrapperCls="page-loader-fix" />;

  return (
    <Box className="mainContainer">
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
          color: theme.palette.common.white,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            color: theme.palette.common.white,
            textTransform: 'none',
            fontSize: '15px',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
          }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600, m: 0 }}>
          {tail?.tailNumber ?? '-'} FAQs
        </Typography>
      </Box>
      <NewFaqContent purpose={`${TAIL_NUMBER_FAQ_PURPOSE_PREFIX}${tailNumberId}`} />
    </Box>
  );
};

export default function TailNumberFaq({ tailNumberId }: Readonly<{ tailNumberId: string }>) {
  return (
    <DashboardHome>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox sx={{ backgroundColor: '#6b0f1aeb' }}>
            <TailNumberFaqContent tailNumberId={tailNumberId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
