'use client';

import AirlinesIcon from '@mui/icons-material/Airlines';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
  useTypesOfCharterCategoryChangeStatus,
  useTypesOfCharterCategoryDelete,
  useTypesOfCharterCategoryGetAll,
  useTypesOfCharterCategoryReorder,
} from '@/api/hooks/types-of-charter/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { rawHtmlSanitize } from '@/lib/functions/sanitize';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachTypesOfCharterCategory } from '@/types/apps/types-of-charter/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Title',
  'Description',
  'Status',
  'Published Date',
  'Last Updated Date',
];

const TypesOfCharterCategoryListMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [typesOfCharterCatStatusValue, setTypesOfCharterCatStatusValue] = useState<
    TStatusChangeType | ''
  >('');
  const [typesOfCharterCatSearchRaw, setTypesOfCharterCatSearchRaw] = useState('');
  const typesOfCharterCatSearchValue = useDebounce(typesOfCharterCatSearchRaw, 500);

  const {
    data: typesOfCharterCategoryListData,
    isLoading: typesOfCharterCategoryListDataLoading,
    refetch: refetchTheTypesOfCharterCategoryList,
  } = useTypesOfCharterCategoryGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: typesOfCharterCatSearchValue,
    status: typesOfCharterCatStatusValue,
  });

  const [items, setItems] = useState<TEachTypesOfCharterCategory[]>([]);

  const { mutate: reorderTypesOfCharterCategory } = useTypesOfCharterCategoryReorder({});

  useEffect(() => {
    if (typesOfCharterCategoryListData?.docs) {
      setItems(typesOfCharterCategoryListData.docs as TEachTypesOfCharterCategory[]);
    }
  }, [typesOfCharterCategoryListData?.docs]);

  const handleReorder = (newItems: TEachTypesOfCharterCategory[]) => {
    setItems(newItems);
    reorderTypesOfCharterCategory({
      ids: newItems.map((item) => item?._id),
    });
  };

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Types Of Charter Category listing page">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(PAGE_ROUTE.dashboard.typesOfCharter.add);
            }}
          >
            Add New Charter Type +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setTypesOfCharterCatSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setTypesOfCharterCatStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 200, 600, undefined, 200, 200]}
              data={items.length > 0 ? items : []}
              isSortable
              onReorder={handleReorder}
              pageCount={typesOfCharterCategoryListData?.meta?.totalPages ?? 0}
              paginationLabel={`${typesOfCharterCategoryListData?.meta?.totalDocs ?? 0} Results | Page ${typesOfCharterCategoryListData?.meta?.page ?? 1} of ${typesOfCharterCategoryListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={typesOfCharterCategoryListDataLoading}
              noDataPlaceholder="No Charter Category Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
                  <TableCell>{row?.title}</TableCell>
                  <TableCell>
                    <Box
                      className="clamp-text ck-content"
                      dangerouslySetInnerHTML={{
                        __html: rawHtmlSanitize(row?.description ?? ''),
                      }}
                    />
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
                <TypesOfCharterCatActionComp
                  index={index}
                  row={row}
                  refetchTheTypesOfCharterCategoryList={() => {
                    refetchTheTypesOfCharterCategoryList();
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

export default TypesOfCharterCategoryListMain;

const TypesOfCharterCatActionComp = ({
  row,
  index,
  refetchTheTypesOfCharterCategoryList,
}: {
  row: TEachTypesOfCharterCategory;
  index: number;
  refetchTheTypesOfCharterCategoryList: () => void;
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

  const {
    mutateAsync: deleteTypesOfCharterCategory,
    isPending: deleteTypesOfCharterCategoryLoading,
  } = useTypesOfCharterCategoryDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchTheTypesOfCharterCategoryList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  const {
    mutateAsync: statusTypesOfCharterCategory,
    isPending: statusTypesOfCharterCategoryLoading,
  } = useTypesOfCharterCategoryChangeStatus({
    optionalCallback: () => {
      closeStatusModal();
      refetchTheTypesOfCharterCategoryList();
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
            router.push(`${PAGE_ROUTE.dashboard.typesOfCharter.list}/${row?._id}/edit`);
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
            router.push(`${PAGE_ROUTE.dashboard.typesOfCharter.list}/${row?._id}/charters`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <AirlinesIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">Charters</Typography>
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
            Are you sure you want to update this Charter Category's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusTypesOfCharterCategoryLoading}
              disabled={statusTypesOfCharterCategoryLoading}
              onClick={() => {
                statusTypesOfCharterCategory({
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
              disabled={statusTypesOfCharterCategoryLoading}
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
            Are you sure want to delete the Charter Category?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteTypesOfCharterCategoryLoading}
              disabled={deleteTypesOfCharterCategoryLoading}
              onClick={() => {
                deleteTypesOfCharterCategory(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteTypesOfCharterCategoryLoading}
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
