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
import { useCityGetAll, useCityHardDelete, useCityRestore } from '@/api/hooks/city/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { replacePattern, toProperCase } from '@/lib/functions/validation';
import regex from '@/lib/regex';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachCity } from '@/types/apps/city/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Title',
  'Location',
  'Status',
  'Featured',
  'Published Date',
  'Last Updated Date',
];

const CityListDeletedMain = () => {
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [cityStatusValue, setCityStatusValue] = useState<TStatusChangeType | ''>('');
  const [citySearchRaw, setCitySearchRaw] = useState('');
  const citySearchValue = useDebounce(citySearchRaw, 500);

  const {
    data: cityListData,
    isLoading: cityListDataLoading,
    refetch: refetchTheCityList,
  } = useCityGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: citySearchValue,
    status: cityStatusValue,
    isDeleted: true,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Deleted Destinations listing page" />

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setCitySearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setCityStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 500, 400, undefined, undefined, 200, 200]}
              data={
                (cityListData?.docs?.length ?? 0 > 0) ? (cityListData?.docs as TEachCity[]) : []
              }
              pageCount={cityListData?.meta?.totalPages ?? 0}
              paginationLabel={`${cityListData?.meta?.totalDocs ?? 0} Results | Page ${cityListData?.meta?.page ?? 1} of ${cityListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={cityListDataLoading}
              noDataPlaceholder="No Deleted Destinations Found!"
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
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >{`${toProperCase(row?.slug, regex.removeHyphen) ?? '-'}, ${replacePattern(row?.country?.name) ?? '-'}`}</TableCell>
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
                <CityDeletedActionComp
                  index={index}
                  row={row}
                  refetchCityList={() => {
                    refetchTheCityList();
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

export default CityListDeletedMain;

const CityDeletedActionComp = ({
  row,
  index,
  refetchCityList,
}: {
  row: TEachCity;
  index: number;
  refetchCityList: () => void;
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

  const { mutateAsync: restoreCity, isPending: restoreCityLoading } = useCityRestore({
    optionalCallback: () => {
      closeRestoreModal();
      refetchCityList();
    },
    errorCallback: () => {
      closeRestoreModal();
    },
  });

  const { mutateAsync: deletePermanentCity, isPending: deletePermanentCityLoading } =
    useCityHardDelete({
      optionalCallback: () => {
        closeDeletePermanentModal();
        refetchCityList();
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

      {/* Restore (Undo Delete) Modal */}
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
            Are you sure want to restore the destination?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={restoreCityLoading}
              disabled={restoreCityLoading}
              onClick={() => {
                restoreCity(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={restoreCityLoading}
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
            Are you sure want to permanently delete the destination?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deletePermanentCityLoading}
              disabled={deletePermanentCityLoading}
              onClick={() => {
                deletePermanentCity(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deletePermanentCityLoading}
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
