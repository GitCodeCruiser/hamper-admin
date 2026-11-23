'use client';

import { Box, TableCell, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import ProfileAvatar from '../../components/common/images/ProfileAvatar';
import { UserActionComp } from '../../components/user/UserActionComp';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import { useUsersGetAll } from '@/api/hooks/user/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachAdminUser } from '@/types/apps/user/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

const tableHeadData = ['Action', 'Image', 'Name', 'Email', 'Phone', 'Status'];

const UserListMain = () => {
  const router = useRouter();
  const theme = useTheme();
  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [userStatusValue, setUserStatusValue] = useState<TStatusChangeType | ''>('');
  const [userSearchRaw, setUserSearchRaw] = useState('');
  const userSearchValue = useDebounce(userSearchRaw, 500);

  const {
    data: userListData,
    isLoading: userListDataLoading,
    refetch: refetchUserList,
  } = useUsersGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: userSearchValue,
    status: userStatusValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="User Management">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(PAGE_ROUTE.dashboard.users.add);
            }}
          >
            Add New User +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setUserSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setUserStatusValue(() => value.toLowerCase() as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 100, 250, 300, 180, 120]}
              data={
                (userListData?.docs?.length ?? 0) > 0
                  ? (userListData?.docs as TEachAdminUser[])
                  : []
              }
              pageCount={userListData?.meta?.totalPages ?? 0}
              paginationLabel={`${userListData?.meta?.totalDocs ?? 0} Results | Page ${userListData?.meta?.page ?? 1} of ${userListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={userListDataLoading}
              noDataPlaceholder="No Users Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => {
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
                      <Typography
                        noWrap
                        sx={{
                          maxWidth: 250,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontWeight: 600,
                        }}
                      >
                        {row?.fullName || 'N/A'}
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
                        {row?.email || 'N/A'}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        noWrap
                        sx={{
                          maxWidth: 180,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {row?.phone || 'N/A'}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box
                        className="status-chip"
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '12px',
                          fontWeight: 600,
                          backgroundColor:
                            row.status === 'active'
                              ? theme.palette.customColors?.colorD2F798
                              : theme.palette.customColors?.colorFFEFBD,
                          color:
                            row.status === 'active'
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                          textTransform: 'capitalize',
                        }}
                      >
                        {row?.status || 'Active'}
                      </Box>
                    </TableCell>
                  </>
                );
              }}
              renderActions={(row, index) => (
                <UserActionComp
                  index={index}
                  row={row}
                  refetchUserList={() => {
                    refetchUserList();
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

export default UserListMain;
