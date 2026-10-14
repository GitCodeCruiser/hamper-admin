'use client';

import { Box, TableCell, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import ProfileAvatar from '../../components/common/images/ProfileAvatar';
import { SalesPersonActionComp } from '../../components/sales-person/SalesPersonActionComp';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import { useSalesPersonGetAll } from '@/api/hooks/sales-person/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachSalesPerson } from '@/types/apps/sales-person/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

const tableHeadData = ['Action', 'Image', 'Name', 'Email', 'Status'];

const SalesPersonMain = () => {
  const router = useRouter();
  const theme = useTheme();
  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [salesPersonStatusValue, setSalesPersonStatusValue] = useState<TStatusChangeType | ''>('');
  const [salesPersonSearchRaw, setSalesPersonSearchRaw] = useState('');
  const salesPersonSearchValue = useDebounce(salesPersonSearchRaw, 500);

  const {
    data: salesPersonListData,
    isLoading: salesPersonListDataLoading,
    refetch: refetchSalesPersonList,
  } = useSalesPersonGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: salesPersonSearchValue,
    status: salesPersonStatusValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Sales Person Management">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(PAGE_ROUTE.dashboard.salesPerson.add);
            }}
          >
            Add New Sales Person +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            // console.log(value);
            setSalesPersonSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            // console.log(value);
            setSalesPersonStatusValue(() => value.toLowerCase() as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 120, 300, 350, 150]}
              data={
                (salesPersonListData?.docs?.length ?? 0 > 0)
                  ? (salesPersonListData?.docs as TEachSalesPerson[])
                  : []
              }
              pageCount={salesPersonListData?.meta?.totalPages ?? 0}
              paginationLabel={`${salesPersonListData?.meta?.totalDocs ?? 0} Results | Page ${salesPersonListData?.meta?.page ?? 1} of ${salesPersonListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={salesPersonListDataLoading}
              noDataPlaceholder="No Sales Person Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => {
                const currentProfileImg = row?.profileImage;

                return (
                  <>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <ProfileAvatar image={row?.profileImage} size={40} alt={row?.fullName} />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <Typography
                        noWrap
                        sx={{
                          maxWidth: 250,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {row?.fullName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        noWrap
                        sx={{
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {row?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        className="status-chip"
                        sx={{
                          backgroundColor:
                            row.status === 'active'
                              ? theme.palette.customColors?.colorD2F798
                              : theme.palette.customColors?.colorFFEFBD,
                          textTransform: 'capitalize',
                        }}
                      >
                        {row?.status}
                      </Box>
                    </TableCell>
                  </>
                );
              }}
              renderActions={(row, index) => (
                <SalesPersonActionComp
                  index={index}
                  row={row}
                  refetchSalesPersonList={() => {
                    refetchSalesPersonList();
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

export default SalesPersonMain;
