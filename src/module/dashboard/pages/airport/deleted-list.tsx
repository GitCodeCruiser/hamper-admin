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
import { MouseEvent, Suspense, useCallback, useState } from 'react';


import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useAirportGetAll,
  useAirportHardDelete,
  useAirportRestore,
} from '@/api/hooks/airport/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachAirport } from '@/types/apps/airport/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Title',
  'Status',
  'Featured',
  'Published Date',
  'Last Updated Date',
];

const AirportListDeletedMain = () => {
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [airportStatusValue, setAirportStatusValue] = useState<TStatusChangeType | ''>('');
  const [airportSearchRaw, setAirportSearchRaw] = useState('');
  const airportSearchValue = useDebounce(airportSearchRaw, 500);

  const {
    data: airportListData,
    isLoading: airportListDataLoading,
    refetch: refetchTheAirportList,
  } = useAirportGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: airportSearchValue,
    status: airportStatusValue,
    isDeleted: true,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Deleted Airport listing page" />

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setAirportSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setAirportStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 800, undefined, undefined, 200, 200]}
              data={
                (airportListData?.docs?.length ?? 0 > 0)
                  ? (airportListData?.docs as TEachAirport[])
                  : []
              }
              pageCount={airportListData?.meta?.totalPages ?? 0}
              paginationLabel={`${airportListData?.meta?.totalDocs ?? 0} Results | Page ${airportListData?.meta?.page ?? 1} of ${airportListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={airportListDataLoading}
              noDataPlaceholder="No Deleted Airport Found!"
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
                <AirportDeletedActionComp
                  index={index}
                  row={row}
                  refetchAirportList={() => {
                    refetchTheAirportList();
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

export default AirportListDeletedMain;

const AirportDeletedActionComp = ({
  row,
  index,
  refetchAirportList,
}: {
  row: TEachAirport;
  index: number;
  refetchAirportList: () => void;
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

  const { mutateAsync: restoreAirport, isPending: restoreAirportLoading } = useAirportRestore({
    optionalCallback: () => {
      closeRestoreModal();
      refetchAirportList();
    },
    errorCallback: () => {
      closeRestoreModal();
    },
  });

  const { mutateAsync: deletePermanentAirport, isPending: deletePermanentAirportLoading } =
    useAirportHardDelete({
      optionalCallback: () => {
        closeDeletePermanentModal();
        refetchAirportList();
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
            Are you sure want to restore the airport?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={restoreAirportLoading}
              disabled={restoreAirportLoading}
              onClick={() => {
                restoreAirport(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={restoreAirportLoading}
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
            Are you sure want to permanently delete the airport?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deletePermanentAirportLoading}
              disabled={deletePermanentAirportLoading}
              onClick={() => {
                deletePermanentAirport(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deletePermanentAirportLoading}
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
