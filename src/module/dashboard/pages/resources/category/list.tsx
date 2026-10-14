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
  useResourcesCategoryChangeStatus,
  useResourcesCategoryDelete,
  useResourcesCategoryGetAll,
  useResourcesCategoryReorder,
} from '@/api/hooks/resources/hooks';
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
import { TEachResourcesCategory } from '@/types/apps/resources/index.type';
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

const ResourcesCategoryListMain = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [resourcesCatStatusValue, setResourcesCatStatusValue] = useState<TStatusChangeType | ''>(
    '',
  );
  const [resourcesCatSearchRaw, setResourcesCatSearchRaw] = useState('');
  const resourcesCatSearchValue = useDebounce(resourcesCatSearchRaw, 500);

  const {
    data: resourcesCategoryListData,
    isLoading: resourcesCategoryListDataLoading,
    refetch: refetchTheResourcesCategoryList,
  } = useResourcesCategoryGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: resourcesCatSearchValue,
    status: resourcesCatStatusValue,
  });

  const [items, setItems] = useState<TEachResourcesCategory[]>([]);

  const { mutate: reorderResourcesCategory } = useResourcesCategoryReorder({});

  useEffect(() => {
    if (resourcesCategoryListData?.docs) {
      setItems(resourcesCategoryListData.docs as TEachResourcesCategory[]);
    }
  }, [resourcesCategoryListData?.docs]);

  const handleReorder = (newItems: TEachResourcesCategory[]) => {
    setItems(newItems);
    reorderResourcesCategory({
      ids: newItems.map((item) => item?._id),
    });
  };

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Resources Category listing page">
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(PAGE_ROUTE.dashboard.resources.add);
            }}
          >
            Add New Resource Category +
          </CustomButtonPrimary>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setResourcesCatSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setResourcesCatStatusValue(() => value as TStatusChangeType);
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
              pageCount={resourcesCategoryListData?.meta?.totalPages ?? 0}
              paginationLabel={`${resourcesCategoryListData?.meta?.totalDocs ?? 0} Results | Page ${resourcesCategoryListData?.meta?.page ?? 1} of ${resourcesCategoryListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={resourcesCategoryListDataLoading}
              noDataPlaceholder="No Resource Category Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
                  <TableCell
                    sx={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      minWidth: 250,
                    }}
                  >
                    {row?.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 250,
                    }}
                  >
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
                <ResourcesCatActionComp
                  index={index}
                  row={row}
                  refetchTheResourcesCategoryList={() => {
                    refetchTheResourcesCategoryList();
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

export default ResourcesCategoryListMain;

const ResourcesCatActionComp = ({
  row,
  index,
  refetchTheResourcesCategoryList,
}: {
  row: TEachResourcesCategory;
  index: number;
  refetchTheResourcesCategoryList: () => void;
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

  const { mutateAsync: deleteResourcesCategory, isPending: deleteResourcesCategoryLoading } =
    useResourcesCategoryDelete({
      optionalCallback: () => {
        closeDeleteModal();
        refetchTheResourcesCategoryList();
      },
      errorCallback: () => {
        closeDeleteModal();
      },
    });

  const { mutateAsync: statusResourcesCategory, isPending: statusResourcesCategoryLoading } =
    useResourcesCategoryChangeStatus({
      optionalCallback: () => {
        closeStatusModal();
        refetchTheResourcesCategoryList();
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
            router.push(`${PAGE_ROUTE.dashboard.resources.list}/${row?._id}/edit`);
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
            router.push(`${PAGE_ROUTE.dashboard.resources.list}/${row?._id}/resources`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <AirlinesIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">Resources</Typography>
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
            Are you sure you want to update this Resource Category's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusResourcesCategoryLoading}
              disabled={statusResourcesCategoryLoading}
              onClick={() => {
                statusResourcesCategory({
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
              disabled={statusResourcesCategoryLoading}
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
            Are you sure want to delete the Resource Category?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteResourcesCategoryLoading}
              disabled={deleteResourcesCategoryLoading}
              onClick={() => {
                deleteResourcesCategory(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteResourcesCategoryLoading}
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
