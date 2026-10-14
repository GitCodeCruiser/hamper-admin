'use client';

import { StarOutlineOutlined, StarPurple500Outlined } from '@mui/icons-material';
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
  useRouteChangeStatus,
  useRouteDelete,
  useRouteGetAll,
  useRouteMakeFeatured,
} from '@/api/hooks/route/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachRoute } from '@/types/apps/route/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Title',
  'Departure',
  'Arrival',
  'Status',
  'Featured',
  'Published Date',
  'Last Updated Date',
];

const RouteListMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [routeStatusValue, setRouteStatusValue] = useState<TStatusChangeType | ''>('');
  const [routeSearchRaw, setRouteSearchRaw] = useState('');
  const routeSearchValue = useDebounce(routeSearchRaw, 500);

  const {
    data: routeListData,
    isLoading: routeListDataLoading,
    refetch: refetchTheRouteList,
  } = useRouteGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: routeSearchValue,
    status: routeStatusValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Route listing page">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(PAGE_ROUTE.dashboard.route.add);
            }}
          >
            Add New Route +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setRouteSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setRouteStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 450, 300, 300, undefined, undefined, 200, 200]}
              data={
                (routeListData?.docs?.length ?? 0 > 0) ? (routeListData?.docs as TEachRoute[]) : []
              }
              pageCount={routeListData?.meta?.totalPages ?? 0}
              paginationLabel={`${routeListData?.meta?.totalDocs ?? 0} Results | Page ${routeListData?.meta?.page ?? 1} of ${routeListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={routeListDataLoading}
              noDataPlaceholder="No Route Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
                  <TableCell
                    sx={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      minWidth: 200,
                    }}
                  >
                    {row?.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      minWidth: 200,
                    }}
                  >{`${[row?.source.country?.name, row?.source.state?.name, row?.source.city?.name].filter(Boolean).join(', ') || 'N/A'}`}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      minWidth: 200,
                    }}
                  >{`${[row?.destination.country?.name, row?.destination.state?.name, row?.destination.city?.name].filter(Boolean).join(', ') || 'N/A'}`}</TableCell>
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
                  <TableCell>{row?.isFeatured ? 'Yes' : 'No'}</TableCell>
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
                <RouteActionComp
                  index={index}
                  row={row}
                  refetchRouteList={() => {
                    refetchTheRouteList();
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

export default RouteListMain;

const RouteActionComp = ({
  row,
  index,
  refetchRouteList,
}: {
  row: TEachRoute;
  index: number;
  refetchRouteList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [featureModal, setFeatureModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

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

  const openFeatureModal = useCallback(() => {
    setFeatureModal(true);
    handleMenuClose();
  }, [setFeatureModal]);

  const closeFeatureModal = useCallback(() => {
    setFeatureModal(false);
  }, [setFeatureModal]);

  const openStatusModal = useCallback(() => {
    setStatusModal(true);
    handleMenuClose();
  }, [setStatusModal]);

  const closeStatusModal = useCallback(() => {
    setStatusModal(false);
  }, [setStatusModal]);

  const { mutateAsync: deleteRoute, isPending: deleteRouteLoading } = useRouteDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchRouteList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  const { mutateAsync: makeRouteFeatured, isPending: makeRouteFeaturedLoading } =
    useRouteMakeFeatured({
      optionalCallback: () => {
        closeFeatureModal();
        refetchRouteList();
      },
      errorCallback: () => {
        closeFeatureModal();
      },
    });

  const { mutateAsync: statusRoute, isPending: statusRouteLoading } = useRouteChangeStatus({
    optionalCallback: () => {
      closeStatusModal();
      refetchRouteList();
    },
    errorCallback: () => {
      closeStatusModal();
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
            openFeatureModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {row?.isFeatured ? (
              <StarPurple500Outlined
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
            ) : (
              <StarOutlineOutlined fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            )}
          </ListItemIcon>
          <Typography variant="body2">{row?.isFeatured ? 'Featured' : 'Feature'}</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push(`${PAGE_ROUTE.dashboard.route.list}/${row?._id}/content`);
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
            router.push(`${PAGE_ROUTE.dashboard.route.list}/${row?._id}/faq`);
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
            router.push(`${PAGE_ROUTE.dashboard.route.list}/${row?._id}/edit`);
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
            Are you sure you want to update this route's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusRouteLoading}
              disabled={statusRouteLoading}
              onClick={() => {
                statusRoute({
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
              disabled={statusRouteLoading}
              onClick={closeStatusModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Feature Modal */}
      <MuiModalWrapper open={featureModal} onClose={closeFeatureModal} isAutoClose={false}>
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
            Are you sure you want to update this route's featured status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={makeRouteFeaturedLoading}
              disabled={makeRouteFeaturedLoading}
              onClick={() => {
                makeRouteFeatured(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={makeRouteFeaturedLoading}
              onClick={closeFeatureModal}
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
            Are you sure want to delete the route?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteRouteLoading}
              disabled={deleteRouteLoading}
              onClick={() => {
                deleteRoute(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteRouteLoading}
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
