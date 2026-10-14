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
  useAirportDataGetAll,
  useAirportDataHardDelete,
  useAirportDataRestore,
} from '@/api/hooks/airport-data/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachAirportData } from '@/types/apps/airport-data/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Title',
  'ICAO',
  'IATA',
  'Status',
  'Published Date',
  'Last Updated Date',
];

const AirportDataListDeletedMain = () => {
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [airportDataStatusValue, setAirportDataStatusValue] = useState<TStatusChangeType | ''>('');
  const [airportDataSearchRaw, setAirportDataSearchRaw] = useState('');
  const airportDataSearchValue = useDebounce(airportDataSearchRaw, 500);

  const {
    data: airportDataListData,
    isLoading: airportDataListDataLoading,
    refetch: refetchTheAirportDataList,
  } = useAirportDataGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: airportDataSearchValue,
    status: airportDataStatusValue,
    isDeleted: true,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Deleted Airport Data listing page" />

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setAirportDataSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setAirportDataStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 500, undefined, undefined, undefined, 200, 200]}
              data={
                (airportDataListData?.docs?.length ?? 0 > 0)
                  ? (airportDataListData?.docs as TEachAirportData[])
                  : []
              }
              pageCount={airportDataListData?.meta?.totalPages ?? 0}
              paginationLabel={`${airportDataListData?.meta?.totalDocs ?? 0} Results | Page ${airportDataListData?.meta?.page ?? 1} of ${airportDataListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={airportDataListDataLoading}
              noDataPlaceholder="No Deleted Airport Data Found!"
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
                  <TableCell>{row?.icao}</TableCell>
                  <TableCell>{row?.iata}</TableCell>
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
                <AirportDataDeletedActionComp
                  index={index}
                  row={row}
                  refetchAirportDataList={() => {
                    refetchTheAirportDataList();
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

export default AirportDataListDeletedMain;

const AirportDataDeletedActionComp = ({
  row,
  index,
  refetchAirportDataList,
}: {
  row: TEachAirportData;
  index: number;
  refetchAirportDataList: () => void;
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

  const { mutateAsync: restoreAirportData, isPending: restoreAirportDataLoading } =
    useAirportDataRestore({
      optionalCallback: () => {
        closeRestoreModal();
        refetchAirportDataList();
      },
      errorCallback: () => {
        closeRestoreModal();
      },
    });

  const { mutateAsync: deletePermanentAirportData, isPending: deletePermanentAirportDataLoading } =
    useAirportDataHardDelete({
      optionalCallback: () => {
        closeDeletePermanentModal();
        refetchAirportDataList();
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
            Are you sure want to restore the airport data?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={restoreAirportDataLoading}
              disabled={restoreAirportDataLoading}
              onClick={() => {
                restoreAirportData(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={restoreAirportDataLoading}
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
            Are you sure want to permanently delete the airport data?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deletePermanentAirportDataLoading}
              disabled={deletePermanentAirportDataLoading}
              onClick={() => {
                deletePermanentAirportData(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deletePermanentAirportDataLoading}
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
