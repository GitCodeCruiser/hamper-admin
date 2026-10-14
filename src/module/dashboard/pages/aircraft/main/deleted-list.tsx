'use client';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {
  Box,
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
import { MouseEvent, Suspense, useCallback, useMemo, useState } from 'react';


import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useAircraftCategoryListing,
  useAircraftGetAll,
  useAircraftHardDelete,
  useAircraftRestore,
} from '@/api/hooks/aircraft/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
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

const AircraftListDeletedMain = () => {
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
    isDeleted: true,
  });

  const { data: aircraftCategoryListRawData } = useAircraftCategoryListing();

  const aircraftCategoryList = useMemo(() => {
    return aircraftCategoryListRawData ?? [];
  }, [aircraftCategoryListRawData]);

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Deleted Aircraft listing page" />

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setAircraftSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setAircraftStatusValue(() => value as TStatusChangeType);
          }}
          renderOtherSelectableComponent={() => (
            <CustomSelect
              initialValue="Status"
              className="rgt-select"
              value={aircraftCategorySelected}
              onChange={(e) => {
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
              noDataPlaceholder="No Deleted Aircraft Found!"
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
                <AircraftDeletedActionComp
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

export default AircraftListDeletedMain;

const AircraftDeletedActionComp = ({
  row,
  index,
  refetchAircraftList,
}: {
  row: TEachAircraft;
  index: number;
  refetchAircraftList: () => void;
}) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [restoreModal, setRestoreModal] = useState(false);
  const [deletePermanentModal, setDeletePermanentModal] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, idx: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(idx);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };

  const openRestoreModal = useCallback(() => {
    setRestoreModal(true);
    handleMenuClose();
  }, [setRestoreModal]);

  const closeRestoreModal = useCallback(() => {
    setRestoreModal(false);
  }, [setRestoreModal]);

  const openDeletePermanentModal = useCallback(() => {
    setDeletePermanentModal(true);
    handleMenuClose();
  }, [setDeletePermanentModal]);

  const closeDeletePermanentModal = useCallback(() => {
    setDeletePermanentModal(false);
  }, [setDeletePermanentModal]);

  const { mutateAsync: restoreAircraft, isPending: restoreAircraftLoading } = useAircraftRestore({
    optionalCallback: () => {
      closeRestoreModal();
      refetchAircraftList();
    },
    errorCallback: () => {
      closeRestoreModal();
    },
  });

  const { mutateAsync: deletePermanentAircraft, isPending: deletePermanentAircraftLoading } =
    useAircraftHardDelete({
      optionalCallback: () => {
        closeDeletePermanentModal();
        refetchAircraftList();
      },
      errorCallback: () => {
        closeDeletePermanentModal();
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
              minWidth: 160,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
              mt: 0.5,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            openRestoreModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <RestoreFromTrashIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
          </ListItemIcon>
          <Typography variant="body2">Undo Delete</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            openDeletePermanentModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <DeleteForeverIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Permanent Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Restore Modal */}
      <MuiModalWrapper open={restoreModal} onClose={closeRestoreModal} isAutoClose={false}>
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
            Are you sure want to restore the aircraft?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={restoreAircraftLoading}
              disabled={restoreAircraftLoading}
              onClick={() => {
                restoreAircraft(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={restoreAircraftLoading}
              onClick={closeRestoreModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Permanent Delete Modal */}
      <MuiModalWrapper
        open={deletePermanentModal}
        onClose={closeDeletePermanentModal}
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
            Are you sure want to permanently delete the aircraft?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deletePermanentAircraftLoading}
              disabled={deletePermanentAircraftLoading}
              onClick={() => {
                deletePermanentAircraft(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deletePermanentAircraftLoading}
              onClick={closeDeletePermanentModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>
    </>
  );
};
