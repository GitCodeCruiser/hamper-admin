'use client';

import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Stack, TableCell, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useAircraftCategoryGet,
  useGetTypicalAircraft,
  useReorderTypicalAircraft,
} from '@/api/hooks/aircraft/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachAircraft } from '@/types/apps/aircraft/index.type';

export default function AircraftCategoryTypicalList({
  aircraftCategoryId,
}: Readonly<{
  aircraftCategoryId: string;
}>) {
  const router = useRouter();
  const theme = useTheme();

  //=============================================================>
  // DATA FETCHING & STATE
  //=============================================================>
  const { data: categoryData, isLoading: categoryLoading } = useAircraftCategoryGet({
    id: aircraftCategoryId,
  });

  const {
    data: typicalAircraftData,
    isLoading: typicalAircraftLoading,
    refetch: refetchTypicalAircraft,
  } = useGetTypicalAircraft(aircraftCategoryId);

  const [items, setItems] = useState<TEachAircraft[]>([]);

  useEffect(() => {
    if (typicalAircraftData) {
      setItems(typicalAircraftData);
    }
  }, [typicalAircraftData]);

  //=============================================================>
  // REORDER MUTATION
  //=============================================================>
  const { mutate: reorderTypicalAircraft } = useReorderTypicalAircraft({
    optionalCallback: () => {
      toast.success('Aircraft models reordered successfully');
      refetchTypicalAircraft();
    },
    errorCallback: () => {
      toast.error('Failed to reorder aircraft models');
      refetchTypicalAircraft(); // Revert back on error
    },
  });

  const handleReorder = (newItems: TEachAircraft[]) => {
    setItems(newItems);
    const ids = newItems.map((item) => item._id).filter(Boolean);
    reorderTypicalAircraft({ ids });
  };

  const isLoading = categoryLoading || typicalAircraftLoading;

  return (
    <DashboardHome>
      <ErrorBoundary>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push(PAGE_ROUTE.dashboard.availableAircraft.categoryList)}
            sx={{
              borderColor: 'rgba(212, 175, 55, 0.4)',
              color: '#D4AF37',
              '&:hover': {
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
              },
            }}
          >
            Back
          </Button>
          <Box>
            <SectionHeading
              title={
                categoryData?.title
                  ? `Typical Aircraft Models: ${categoryData.title}`
                  : 'Typical Aircraft Models'
              }
            />
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              Manage and order typical aircraft models for this category.
            </Typography>
          </Box>
        </Stack>

        <CommonCardBox>
          {isLoading ? (
            <PageLoader wrapperCls="page-loader" />
          ) : items && items.length > 0 ? (
            <ReusableDataTable
              headArray={['Title', 'Category']}
              columnWidths={[500, 300]}
              data={items}
              isSortable={true}
              onReorder={handleReorder}
              showPagination={false}
              renderRow={(row: TEachAircraft) => (
                <>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {row.name ?? row.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {row.category?.title || categoryData?.title || 'N/A'}
                  </TableCell>
                </>
              )}
            />
          ) : (
            <Box
              sx={{
                p: 8,
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px dashed rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)',
              }}
            >
              <AirplanemodeActiveIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                No typical aircraft models found for this category.
              </Typography>
            </Box>
          )}
        </CommonCardBox>
      </ErrorBoundary>
    </DashboardHome>
  );
}
