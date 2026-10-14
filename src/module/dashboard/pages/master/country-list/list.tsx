'use client';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TableCell,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense, useCallback, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useCountryListChangeStatus,
  useCountryListDelete,
  useCountryListGetAll,
  useCountryListShowInCMS,
} from '@/api/hooks/master/country-list/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachCountryList } from '@/types/apps/master/country-list/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Country',
  'Status',
  'Show in CMS',
  'Published Date',
  'Last Updated Date',
];

const CountryListMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [countryListStatusValue, setCountryListStatusValue] = useState<TStatusChangeType | ''>('');
  const [countryListSearchRaw, setCountryListSearchRaw] = useState('');
  const countryListSearchValue = useDebounce(countryListSearchRaw, 500);

  const {
    data: countryListData,
    isLoading: countryListDataLoading,
    refetch: refetchTheCountryList,
  } = useCountryListGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: countryListSearchValue,
    status: countryListStatusValue,
    sortField: 'name',
    sortOrder: 'asc',
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Country listing page">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(PAGE_ROUTE.dashboard.master.countryList.add);
            }}
          >
            Add New Country +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            // console.log(value);
            setCountryListSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            // console.log(value);
            setCountryListStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, undefined, undefined, undefined, 200, 200]}
              data={
                (countryListData?.docs?.length ?? 0 > 0)
                  ? (countryListData?.docs as TEachCountryList[])
                  : []
              }
              pageCount={countryListData?.meta?.totalPages ?? 0}
              paginationLabel={`${countryListData?.meta?.totalDocs ?? 0} Results | Page ${countryListData?.meta?.page ?? 1} of ${countryListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={countryListDataLoading}
              noDataPlaceholder="No Country List Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
                  <TableCell
                  // sx={{
                  //   whiteSpace: 'nowrap',
                  //   overflow: 'hidden',
                  //   textOverflow: 'ellipsis',
                  // }}
                  >
                    {row?.name}
                  </TableCell>
                  <TableCell>
                    <Box
                      className="status-chip"
                      sx={{
                        backgroundColor:
                          row.status === 'Active'
                            ? theme.palette.customColors?.colorD2F798
                            : theme.palette.customColors?.colorFFEFBD,
                      }}
                    >
                      {row?.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      className="status-chip"
                      sx={{
                        backgroundColor: row.showInCMS
                          ? theme.palette.customColors?.colorD2F798
                          : theme.palette.customColors?.colorFFEFBD,
                      }}
                    >
                      {row?.showInCMS ? 'Yes' : 'No'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {row?.createdAt
                      ? dayjs(row.createdAt).format(humanReadableDateTimeFormatForListing)
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {row?.updatedAt
                      ? dayjs(row.updatedAt).format(humanReadableDateTimeFormatForListing)
                      : '-'}
                  </TableCell>
                </>
              )}
              renderActions={(row, index) => (
                <CountryListActionComp
                  index={index}
                  row={row}
                  refetchCountryList={() => {
                    refetchTheCountryList();
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

export default CountryListMain;

const CountryListActionComp = ({
  row,
  index,
  refetchCountryList,
}: {
  row: TEachCountryList;
  index: number;
  refetchCountryList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [showInCMSModal, setShowInCMSModal] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };

  const openDeleteModal = useCallback(() => {
    setDeleteModal(true);
    handleMenuClose();
  }, [setDeleteModal]);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, [setDeleteModal]);

  const openStatusModal = useCallback(() => {
    setStatusModal(true);
    handleMenuClose();
  }, [setStatusModal]);

  const closeStatusModal = useCallback(() => {
    setStatusModal(false);
  }, [setStatusModal]);

  const openShowInCMSModal = useCallback(() => {
    setShowInCMSModal(true);
    handleMenuClose();
  }, [setShowInCMSModal]);

  const closeShowInCMSModal = useCallback(() => {
    setShowInCMSModal(false);
  }, [setShowInCMSModal]);

  const { mutateAsync: deleteCountry, isPending: deleteCountryLoading } = useCountryListDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchCountryList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  const { mutateAsync: statusCountry, isPending: statusCountryLoading } =
    useCountryListChangeStatus({
      optionalCallback: () => {
        closeStatusModal();
        refetchCountryList();
      },
      errorCallback: () => {
        closeStatusModal();
      },
    });

  const { mutateAsync: showInCMSCountry, isPending: showInCMSCountryLoading } =
    useCountryListShowInCMS({
      optionalCallback: () => {
        closeShowInCMSModal();
        refetchCountryList();
      },
      errorCallback: () => {
        closeShowInCMSModal();
      },
    });

  return (
    <>
      <IconButton size="small" onClick={(e) => handleMenuOpen(e, index)}>
        <MoreVertIcon sx={{ fontSize: CustomSize(18), color: theme.palette.text.secondary }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={activeRowIndex === index}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 150,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
              mt: 0.5,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(`${PAGE_ROUTE.dashboard.master.countryList.list}/${row?._id}/content`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <EditOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">Content</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push(`${PAGE_ROUTE.dashboard.master.countryList.list}/${row?._id}/faq`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <QuizOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">FAQ</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push(`${PAGE_ROUTE.dashboard.master.countryList.list}/${row?._id}/edit`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <EditOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => {
            openStatusModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <ChangeCircleIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Status</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            openShowInCMSModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <ChangeCircleIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Show in CMS</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            openDeleteModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <DeleteOutlineIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Status Modal */}
      <MuiModalWrapper open={statusModal} onClose={closeStatusModal} isAutoClose={false}>
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack">
            <Typography sx={{ fontSize: '32px !important' }}>Alert!</Typography>
          </Stack>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Are you sure you want to update this country's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusCountryLoading}
              disabled={statusCountryLoading}
              onClick={() => {
                statusCountry({
                  id: row?._id,
                  status: row?.status === 'Active' ? 'Inactive' : 'Active',
                });
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={statusCountryLoading}
              onClick={closeStatusModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Show in CMS Modal */}
      <MuiModalWrapper open={showInCMSModal} onClose={closeShowInCMSModal} isAutoClose={false}>
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack">
            <Typography sx={{ fontSize: '32px !important' }}>Alert!</Typography>
          </Stack>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Are you sure you want to update this country's Show in CMS status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={showInCMSCountryLoading}
              disabled={showInCMSCountryLoading}
              onClick={() => {
                showInCMSCountry({
                  id: row?._id,
                  showInCMS: !row?.showInCMS,
                });
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={showInCMSCountryLoading}
              onClick={closeShowInCMSModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Delete Modal */}
      <MuiModalWrapper open={deleteModal} onClose={closeDeleteModal} isAutoClose={false}>
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack">
            <Typography sx={{ fontSize: '32px !important' }}>Alert!</Typography>
          </Stack>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            Are you sure want to delete the country?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteCountryLoading}
              disabled={deleteCountryLoading}
              onClick={() => {
                deleteCountry(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteCountryLoading}
              onClick={closeDeleteModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>
    </>
  );
};
