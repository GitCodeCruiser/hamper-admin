'use client';

import { Box, Chip, TableCell, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import { RedirectionActionComp } from '../../components/redirection/RedirectionActionComp';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import { useRedirectionGetAll } from '@/api/hooks/redirection/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachRedirect } from '@/types/apps/redirection/index.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

const tableHeadData = [
  'Action',
  'Source URL',
  'Destination URL',
  'Status Code',
  'Status',
  'Created At',
];

const RedirectionListMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [redirectionStatusValue, setRedirectionStatusValue] = useState<string>('');
  const [redirectionSearchRaw, setRedirectionSearchRaw] = useState('');
  const redirectionSearchValue = useDebounce(redirectionSearchRaw, 500);

  const {
    data: redirectionListData,
    isLoading: redirectionListDataLoading,
    refetch: refetchRedirectionList,
  } = useRedirectionGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: redirectionSearchValue,
    status: redirectionStatusValue,
    sortField: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Redirection Management">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(PAGE_ROUTE.dashboard.redirection.add);
            }}
          >
            Add New Redirection +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchPlaceHolder="Search by source or destination URL..."
          searchValueGetter={(value) => {
            setRedirectionSearchRaw(() => value);
            setCurrentPageValue(() => 1);
          }}
          statusValueGetter={(value) => {
            setRedirectionStatusValue(() => value);
            setCurrentPageValue(() => 1);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 350, 350, 140, 140, 200]}
              data={
                (redirectionListData?.docs?.length ?? 0) > 0
                  ? (redirectionListData?.docs as TEachRedirect[])
                  : []
              }
              pageCount={redirectionListData?.meta?.totalPages ?? 0}
              paginationLabel={`${redirectionListData?.meta?.totalDocs ?? 0} Results | Page ${
                redirectionListData?.meta?.page ?? 1
              } of ${redirectionListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={redirectionListDataLoading}
              noDataPlaceholder="No Redirections Found!"
              onPageChange={(_, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => {
                const isActive = row?.status?.toLowerCase() === 'active';

                return (
                  <>
                    <TableCell
                      sx={{
                        maxWidth: 350,
                        wordBreak: 'break-all',
                        whiteSpace: 'normal',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {row?.source}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 350,
                        wordBreak: 'break-all',
                        whiteSpace: 'normal',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {row?.destination}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row?.statusCode ?? 301}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: '12px',
                          backgroundColor:
                            row?.statusCode === 301 || row?.statusCode === 308
                              ? 'rgba(56, 142, 60, 0.15)'
                              : 'rgba(25, 118, 210, 0.15)',
                          color:
                            row?.statusCode === 301 || row?.statusCode === 308
                              ? theme.palette.success.main
                              : theme.palette.info.main,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        className="status-chip"
                        sx={{
                          backgroundColor: isActive
                            ? theme.palette.customColors?.colorD2F798
                            : theme.palette.customColors?.colorFFEFBD,
                          textTransform: 'capitalize',
                        }}
                      >
                        {row?.status ?? 'active'}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {row?.createdAt
                        ? dayjs(row?.createdAt).format(humanReadableDateTimeFormatForListing)
                        : 'N/A'}
                    </TableCell>
                  </>
                );
              }}
              renderActions={(row, index) => (
                <RedirectionActionComp
                  index={index}
                  row={row}
                  refetchRedirectionList={() => {
                    refetchRedirectionList();
                  }}
                />
              )}
            />
          </Suspense>
        </ErrorBoundary>
      </CommonCardBox>
    </DashboardHome>
  );
};

export default RedirectionListMain;
