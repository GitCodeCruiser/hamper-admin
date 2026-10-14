'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
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
  useGuideDownloadsDelete,
  useGuideDownloadsGetAll,
} from '@/api/hooks/guide-downloads/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachGuideDownloads } from '@/types/apps/guide-downloads/index.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = ['Action', 'Email', 'Full Name', 'Phone', 'Date of Download'];

const GuideDownloadsMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [guideDownloadSearchRaw, setGuideDownloadSearchRaw] = useState('');
  const guideDownloadSearchValue = useDebounce(guideDownloadSearchRaw, 500);

  const {
    data: guideDownloadListData,
    isLoading: guideDownloadListDataLoading,
    refetch: refetchTheGuideDownloadList,
  } = useGuideDownloadsGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: guideDownloadSearchValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SearchMainComp
          className="home-srch-select"
          isStatusShow={false}
          isSearchShow
          searchValueGetter={(value) => {
            // console.log(value);
            setGuideDownloadSearchRaw(() => value);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 450, undefined, undefined, undefined]}
              data={
                (guideDownloadListData?.docs?.length ?? 0 > 0)
                  ? (guideDownloadListData?.docs as TEachGuideDownloads[])
                  : []
              }
              pageCount={guideDownloadListData?.meta?.totalPages ?? 0}
              paginationLabel={`${guideDownloadListData?.meta?.totalDocs ?? 0} Results | Page ${guideDownloadListData?.meta?.page ?? 1} of ${guideDownloadListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={guideDownloadListDataLoading}
              noDataPlaceholder="No Guide Download Found!"
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
                    {row?.email ?? '-'}
                  </TableCell>
                  <TableCell>{row?.fullName ?? '-'}</TableCell>
                  <TableCell>{`(${row?.countryCode ? '+' : ''}${row?.countryCode ?? '-'}) ${row?.phone ?? '-'}`}</TableCell>
                  <TableCell>{dayjs(row?.createdAt).format('MM-DD-YYYY hh:mm a')}</TableCell>
                </>
              )}
              renderActions={(row, index) => (
                <GuideDownloadsActionComp
                  index={index}
                  row={row}
                  refetchTheGuideDownloadList={() => {
                    refetchTheGuideDownloadList();
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

export default GuideDownloadsMain;

const GuideDownloadsActionComp = ({
  row,
  index,
  refetchTheGuideDownloadList,
}: {
  row: TEachGuideDownloads;
  index: number;
  refetchTheGuideDownloadList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

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

  const { mutateAsync: deleteGuideDownload, isPending: deleteGuideDownloadLoading } =
    useGuideDownloadsDelete({
      optionalCallback: () => {
        closeDeleteModal();
        refetchTheGuideDownloadList();
      },
      errorCallback: () => {
        closeDeleteModal();
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
            Are you sure want to delete the Guide Download?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteGuideDownloadLoading}
              disabled={deleteGuideDownloadLoading}
              onClick={() => {
                deleteGuideDownload(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteGuideDownloadLoading}
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
