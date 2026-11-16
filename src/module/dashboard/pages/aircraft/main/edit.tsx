'use client';

import FlightIcon from '@mui/icons-material/Flight';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import AircraftEditForm from '@/module/dashboard/components/aircraft/AircraftEditForm';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

export default function AircraftPageEdit({ aircraftId }: Readonly<{ aircraftId: string }>) {
  const router = useRouter();

  return (
    <DashboardHome>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <CustomButtonPrimary
          variant="contained"
          color="secondary"
          startIcon={<FlightIcon />}
          onClick={() =>
            router.push(PAGE_ROUTE.dashboard.availableAircraft.aircraftTailNumbers(aircraftId))
          }
        >
          Tail Numbers
        </CustomButtonPrimary>
      </Stack>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <CommonCardBox
            sx={{
              backgroundColor: '#6b0f1aeb',
            }}
          >
            <AircraftEditForm aircraftId={aircraftId} />
          </CommonCardBox>
        </Suspense>
      </ErrorBoundary>
    </DashboardHome>
  );
}
