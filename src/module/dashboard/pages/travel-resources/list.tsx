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
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense, useCallback, useEffect, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useTravelResourcesChangeStatus,
  useTravelResourcesDelete,
  useTravelResourcesGetAll,
  useTravelResourcesReorder,
} from '@/api/hooks/travel-resources-flow/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachTravelResources } from '@/types/apps/travel-resources/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = ['Action', 'Title', 'Status'];

const TravelResourcesListMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [travelResourcesStatusValue, setTravelResourcesStatusValue] = useState<
    TStatusChangeType | ''
  >('');
  const [travelResourcesSearchRaw, setTravelResourcesSearchRaw] = useState('');
  const travelResourcesSearchValue = useDebounce(travelResourcesSearchRaw, 500);

  const {
    data: travelResourcesListData,
    isLoading: travelResourcesListDataLoading,
    refetch: refetchTheTravelResourcesList,
  } = useTravelResourcesGetAll({
    travelResourcesCategoryId: '',
    page: currentPageValue,
    perPage: limitValue,
    search: travelResourcesSearchValue,
    status: travelResourcesStatusValue,
  });

  const [items, setItems] = useState<TEachTravelResources[]>([]);

  const { mutate: reorderTravelResources } = useTravelResourcesReorder({});

  useEffect(() => {
    if (travelResourcesListData?.docs) {
      setItems(travelResourcesListData.docs as TEachTravelResources[]);
    }
  }, [travelResourcesListData?.docs]);

  const handleReorder = (newItems: TEachTravelResources[]) => {
    setItems(newItems);
    reorderTravelResources({
      ids: newItems.map((item) => item?._id),
    });
  };

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Travel Resources Listing">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(`${PAGE_ROUTE.dashboard.travelResources.list}/add`);
            }}
          >
            Add New Travel Resources +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setTravelResourcesSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setTravelResourcesStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              columnWidths={[undefined, 700, undefined]}
              headArray={tableHeadData}
              data={items.length > 0 ? items : []}
              isSortable
              onReorder={handleReorder}
              pageCount={travelResourcesListData?.meta?.totalPages ?? 0}
              paginationLabel={`${travelResourcesListData?.meta?.totalDocs ?? 0} Results | Page ${travelResourcesListData?.meta?.page ?? 1} of ${travelResourcesListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={travelResourcesListDataLoading}
              noDataPlaceholder="No Travel Resources Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {row?.title}
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
                </>
              )}
              renderActions={(row, index) => (
                <TravelResourcesActionComp
                  index={index}
                  row={row}
                  refetchTravelResourcesList={() => {
                    refetchTheTravelResourcesList();
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

export default TravelResourcesListMain;

const TravelResourcesActionComp = ({
  row,
  index,
  refetchTravelResourcesList,
}: {
  row: TEachTravelResources;
  index: number;
  refetchTravelResourcesList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
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

  const openStatusModal = useCallback(() => {
    setStatusModal(true);
    handleMenuClose();
  }, [setStatusModal]);

  const closeStatusModal = useCallback(() => {
    setStatusModal(false);
  }, [setStatusModal]);

  const { mutateAsync: deleteTravelResources, isPending: deleteTravelResourcesLoading } =
    useTravelResourcesDelete({
      optionalCallback: () => {
        closeDeleteModal();
        refetchTravelResourcesList();
      },
      errorCallback: () => {
        closeDeleteModal();
      },
    });

  const { mutateAsync: statusTravelResources, isPending: statusTravelResourcesLoading } =
    useTravelResourcesChangeStatus({
      optionalCallback: () => {
        closeStatusModal();
        refetchTravelResourcesList();
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
            router.push(`${PAGE_ROUTE.dashboard.travelResources.list}/${row?._id}/edit`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <EditOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push(`${PAGE_ROUTE.dashboard.travelResources.list}/${row?._id}/content`);
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
            router.push(`${PAGE_ROUTE.dashboard.travelResources.list}/${row?._id}/faq`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <QuizOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">FAQ</Typography>
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
            Are you sure you want to update this Travel Resources' status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusTravelResourcesLoading}
              disabled={statusTravelResourcesLoading}
              onClick={() => {
                statusTravelResources({
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
              disabled={statusTravelResourcesLoading}
              onClick={closeStatusModal}
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
            Are you sure want to delete this Travel Resources?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteTravelResourcesLoading}
              disabled={deleteTravelResourcesLoading}
              onClick={() => {
                deleteTravelResources(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteTravelResourcesLoading}
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
