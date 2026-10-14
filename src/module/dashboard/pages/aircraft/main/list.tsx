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
import { MouseEvent, Suspense, useCallback, useMemo, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useAircraftCategoryListing,
  useAircraftChangeStatus,
  useAircraftDelete,
  useAircraftGetAll,
  useAircraftMakeBookable,
  useAircraftMakeFeatured,
} from '@/api/hooks/aircraft/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachAircraft } from '@/types/apps/aircraft/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Aircraft Name',
  'Category',
  'Aircraft Available',
  'Quote & Booking Available',
  'Featured',
  'Published Date',
  'Last Updated Date',
];

type TAircraftListMainProps = {};

const AircraftListMain = ({}: TAircraftListMainProps) => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [aircraftStatusValue, setAircraftStatusValue] = useState<TStatusChangeType | ''>('');
  const [aircraftSearchRaw, setAircraftSearchRaw] = useState('');
  const aircraftSearchValue = useDebounce(aircraftSearchRaw, 500);
  const [aircraftCategorySelected, setAircraftCategorySelected] = useState<string>('');

  const {
    data: aircraftListData,
    isLoading: aircraftListDataLoading,
    refetch: refetchTheAircraftList,
  } = useAircraftGetAll({
    categoryId: aircraftCategorySelected,
    page: currentPageValue,
    perPage: limitValue,
    search: aircraftSearchValue,
    status: aircraftStatusValue,
  });

  const { data: aircraftCategoryListRawData, isLoading: aircraftCategoryListRawDataLoading } =
    useAircraftCategoryListing();

  const { aircraftCategoryList } = useMemo(() => {
    const aircraftCategoryList = aircraftCategoryListRawData ?? [];

    return {
      aircraftCategoryList,
    };
  }, [aircraftCategoryListRawData]);

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Aircraft listing page">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CustomButtonPrimary
              variant="contained"
              color="secondary"
              onClick={() => {
                router.push(`${PAGE_ROUTE.dashboard.availableAircraft.add}`);
              }}
            >
              Add New Aircraft +
            </CustomButtonPrimary>
          </Box>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            // console.log(value);
            setAircraftSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            // console.log(value);
            setAircraftStatusValue(() => value as TStatusChangeType);
          }}
          renderOtherSelectableComponent={() => (
            <CustomSelect
              initialValue="Status"
              className="rgt-select"
              value={aircraftCategorySelected}
              onChange={(e) => {
                // console.log(e.target.value, '@TEST');
                setAircraftCategorySelected(() => e.target.value);
              }}
            >
              <MenuItem value="">All Category</MenuItem>
              {aircraftCategoryList?.map((eachAirCat) => (
                <MenuItem value={eachAirCat?._id} key={eachAirCat?._id}>
                  {eachAirCat?.title}
                </MenuItem>
              ))}
            </CustomSelect>
          )}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 300, undefined, undefined, undefined, undefined, 200, 200]}
              data={
                (aircraftListData?.docs?.length ?? 0 > 0)
                  ? (aircraftListData?.docs as TEachAircraft[])
                  : []
              }
              pageCount={aircraftListData?.meta?.totalPages ?? 0}
              paginationLabel={`${aircraftListData?.meta?.totalDocs ?? 0} Results | Page ${aircraftListData?.meta?.page ?? 1} of ${aircraftListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={aircraftListDataLoading}
              noDataPlaceholder="No Aircraft Found!"
              onPageChange={(e, newValue) => {
                // console.log(e, newValue, '@TEST');
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
                    {row?.name ?? '-'}
                  </TableCell>
                  <TableCell>{row?.category?.title ?? '-'}</TableCell>
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
                      {row?.status === 'Active' ? 'Yes' : 'No'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      className="status-chip"
                      sx={{
                        backgroundColor: row?.isBookable
                          ? theme.palette.customColors?.colorD2F798
                          : theme.palette.customColors?.colorFFEFBD,
                      }}
                    >
                      {row?.isBookable ? 'Yes' : 'No'}
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
                <AircraftActionComp
                  index={index}
                  row={row}
                  refetchAircraftList={() => {
                    refetchTheAircraftList();
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

export default AircraftListMain;

const AircraftActionComp = ({
  row,
  index,
  refetchAircraftList,
}: {
  row: TEachAircraft;
  index: number;
  refetchAircraftList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [featureModal, setFeatureModal] = useState(false);
  const [makeBookableModal, setMakeBookableModal] = useState(false);
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

  const openMakeBookableModal = useCallback(() => {
    setMakeBookableModal(true);
    handleMenuClose();
  }, [setMakeBookableModal]);

  const closeMakeBookableModal = useCallback(() => {
    setMakeBookableModal(false);
  }, [setMakeBookableModal]);

  const { mutateAsync: deleteAircraft, isPending: deleteAircraftLoading } = useAircraftDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchAircraftList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  const { mutateAsync: makeAircraftFeatured, isPending: makeAircraftFeaturedLoading } =
    useAircraftMakeFeatured({
      optionalCallback: () => {
        closeFeatureModal();
        refetchAircraftList();
      },
      errorCallback: () => {
        closeFeatureModal();
      },
    });

  const { mutateAsync: makeAircraftBookable, isPending: makeAircraftBookableLoading } =
    useAircraftMakeBookable({
      optionalCallback: () => {
        closeMakeBookableModal();
        refetchAircraftList();
      },
      errorCallback: () => {
        closeMakeBookableModal();
      },
    });

  const { mutateAsync: statusAircraft, isPending: statusAircraftLoading } = useAircraftChangeStatus(
    {
      optionalCallback: () => {
        closeStatusModal();
        refetchAircraftList();
      },
      errorCallback: () => {
        closeStatusModal();
      },
    },
  );

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
            router.push(`${PAGE_ROUTE.dashboard.availableAircraft.list}/${row?._id}/content`);
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
            router.push(`${PAGE_ROUTE.dashboard.availableAircraft.list}/${row?._id}/faq`);
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
            router.push(`${PAGE_ROUTE.dashboard.availableAircraft.list}/${row?._id}/edit`);
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
          <Typography variant="body2">
            {row?.status === 'Active' ? 'Deactivate Aircraft' : 'Activate Aircraft'}
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            openMakeBookableModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <ChangeCircleIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">
            {row?.isBookable ? 'Disable Quotations' : 'Enable Quotations'}
          </Typography>
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

      {/* Feature Modal */}
      <MuiModalWrapper open={featureModal} onClose={closeFeatureModal} isAutoClose={false}>
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
            Are you sure you want to update this aircraft's featured status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={makeAircraftFeaturedLoading}
              disabled={makeAircraftFeaturedLoading}
              onClick={() => {
                makeAircraftFeatured(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={makeAircraftFeaturedLoading}
              onClick={closeFeatureModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Bookable Modal */}
      <MuiModalWrapper
        open={makeBookableModal}
        onClose={closeMakeBookableModal}
        isAutoClose={false}
      >
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
            Are you sure you want to update this aircraft's bookable status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={makeAircraftBookableLoading}
              disabled={makeAircraftBookableLoading}
              onClick={() => {
                makeAircraftBookable(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={makeAircraftBookableLoading}
              onClick={closeMakeBookableModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

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
            Are you sure you want to update this Aircraft's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusAircraftLoading}
              disabled={statusAircraftLoading}
              onClick={() => {
                statusAircraft({
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
              disabled={statusAircraftLoading}
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
            Are you sure want to delete the aircraft?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteAircraftLoading}
              disabled={deleteAircraftLoading}
              onClick={() => {
                deleteAircraft(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteAircraftLoading}
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
