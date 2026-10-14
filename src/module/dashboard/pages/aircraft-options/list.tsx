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
import { MouseEvent, Suspense, useCallback, useEffect, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useAircraftOptionsChangeStatus,
  useAircraftOptionsDelete,
  useAircraftOptionsGetAll,
  useAircraftOptionsReorder,
} from '@/api/hooks/aircraft-options-flow/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachAircraftOptions } from '@/types/apps/aircraft-options/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = ['Action', 'Title', 'Status', 'Published Date', 'Last Updated Date'];

const AircraftOptionsListMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [aircraftOptionsStatusValue, setAircraftOptionsStatusValue] = useState<
    TStatusChangeType | ''
  >('');
  const [aircraftOptionsSearchRaw, setAircraftOptionsSearchRaw] = useState('');
  const aircraftOptionsSearchValue = useDebounce(aircraftOptionsSearchRaw, 500);

  const {
    data: aircraftOptionsListData,
    isLoading: aircraftOptionsListDataLoading,
    refetch: refetchTheAircraftOptionsList,
  } = useAircraftOptionsGetAll({
    aircraftOptionsCategoryId: '',
    page: currentPageValue,
    perPage: limitValue,
    search: aircraftOptionsSearchValue,
    status: aircraftOptionsStatusValue,
  });

  const [items, setItems] = useState<TEachAircraftOptions[]>([]);

  const { mutate: reorderAircraftOptions } = useAircraftOptionsReorder({});

  useEffect(() => {
    if (aircraftOptionsListData?.docs) {
      setItems(aircraftOptionsListData.docs as TEachAircraftOptions[]);
    }
  }, [aircraftOptionsListData?.docs]);

  const handleReorder = (newItems: TEachAircraftOptions[]) => {
    setItems(newItems);
    reorderAircraftOptions({
      ids: newItems.map((item) => item?._id),
    });
  };

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Aircraft Options Listing">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(`${PAGE_ROUTE.dashboard.aircraftOptions.list}/add`);
            }}
          >
            Add New Aircraft Option +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setAircraftOptionsSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setAircraftOptionsStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              columnWidths={[undefined, 500, undefined, 200, 200]}
              headArray={tableHeadData}
              data={items.length > 0 ? items : []}
              isSortable
              onReorder={handleReorder}
              pageCount={aircraftOptionsListData?.meta?.totalPages ?? 0}
              paginationLabel={`${aircraftOptionsListData?.meta?.totalDocs ?? 0} Results | Page ${aircraftOptionsListData?.meta?.page ?? 1} of ${aircraftOptionsListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={aircraftOptionsListDataLoading}
              noDataPlaceholder="No Aircraft Options Found!"
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
                <AircraftOptionsActionComp
                  index={index}
                  row={row}
                  refetchAircraftOptionsList={() => {
                    refetchTheAircraftOptionsList();
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

export default AircraftOptionsListMain;

const AircraftOptionsActionComp = ({
  row,
  index,
  refetchAircraftOptionsList,
}: {
  row: TEachAircraftOptions;
  index: number;
  refetchAircraftOptionsList: () => void;
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

  const { mutateAsync: deleteAircraftOptions, isPending: deleteAircraftOptionsLoading } =
    useAircraftOptionsDelete({
      optionalCallback: () => {
        closeDeleteModal();
        refetchAircraftOptionsList();
      },
      errorCallback: () => {
        closeDeleteModal();
      },
    });

  const { mutateAsync: statusAircraftOptions, isPending: statusAircraftOptionsLoading } =
    useAircraftOptionsChangeStatus({
      optionalCallback: () => {
        closeStatusModal();
        refetchAircraftOptionsList();
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
            router.push(`${PAGE_ROUTE.dashboard.aircraftOptions.list}/${row?._id}/edit`);
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
            router.push(`${PAGE_ROUTE.dashboard.aircraftOptions.list}/${row?._id}/content`);
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
            router.push(`${PAGE_ROUTE.dashboard.aircraftOptions.list}/${row?._id}/faq`);
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
            Are you sure you want to update this Aircraft Option's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusAircraftOptionsLoading}
              disabled={statusAircraftOptionsLoading}
              onClick={() => {
                statusAircraftOptions({
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
              disabled={statusAircraftOptionsLoading}
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
            Are you sure want to delete this Aircraft Option?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteAircraftOptionsLoading}
              disabled={deleteAircraftOptionsLoading}
              onClick={() => {
                deleteAircraftOptions(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteAircraftOptionsLoading}
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
