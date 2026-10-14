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
import { MouseEvent, Suspense, useCallback, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useResourcesChangeStatus,
  useResourcesDelete,
  useResourcesGetAll,
} from '@/api/hooks/resources/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachResources, TEachResourcesCategory } from '@/types/apps/resources/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import ArrowBackIcon from '@/ui/Icons/ArrowBackIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Title',
  'Resource Category',
  'Status',
  'Published Date',
  'Last Updated Date',
];

type TResourcesListMainProps = {
  resourcesCatId: string;
  resourcesCatData?: TEachResourcesCategory;
};

const ResourcesListMain = ({ resourcesCatId, resourcesCatData }: TResourcesListMainProps) => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [resourcesStatusValue, setResourcesStatusValue] = useState<TStatusChangeType | ''>('');
  const [resourcesSearchRaw, setResourcesSearchRaw] = useState('');
  const resourcesSearchValue = useDebounce(resourcesSearchRaw, 500);

  const {
    data: resourcesListData,
    isLoading: resourcesListDataLoading,
    refetch: refetchTheResourcesList,
  } = useResourcesGetAll({
    resourcesCategoryId: resourcesCatId,
    page: currentPageValue,
    perPage: limitValue,
    search: resourcesSearchValue,
    status: resourcesStatusValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title={`${resourcesCatData?.title ?? ''} - Resource Listing`}>
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
              startIcon={<ArrowBackIcon IconColor="currentColor" />}
              onClick={() => {
                router.push(PAGE_ROUTE.dashboard.resources.list);
              }}
            >
              Back
            </CustomButtonPrimary>

            <CustomButtonPrimary
              variant="contained"
              color="secondary"
              onClick={() => {
                router.push(
                  `${PAGE_ROUTE.dashboard.resources.list}/${resourcesCatId}/resources/add`,
                );
              }}
            >
              Add New Resource +
            </CustomButtonPrimary>
          </Box>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setResourcesSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setResourcesStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              columnWidths={[undefined, 500, undefined, undefined, 200, 200]}
              headArray={tableHeadData}
              data={
                (resourcesListData?.docs?.length ?? 0) > 0
                  ? (resourcesListData?.docs as TEachResources[])
                  : []
              }
              pageCount={resourcesListData?.meta?.totalPages ?? 0}
              paginationLabel={`${resourcesListData?.meta?.totalDocs ?? 0} Results | Page ${resourcesListData?.meta?.page ?? 1} of ${resourcesListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={resourcesListDataLoading}
              noDataPlaceholder="No Resource Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
                  <TableCell
                    sx={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    {row?.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    {row?.category?.title}
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
                <ResourcesActionComp
                  index={index}
                  row={row}
                  resourcesCatId={resourcesCatId}
                  refetchResourcesList={() => {
                    refetchTheResourcesList();
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

export default ResourcesListMain;

const ResourcesActionComp = ({
  resourcesCatId,
  row,
  index,
  refetchResourcesList,
}: {
  resourcesCatId: string;
  row: TEachResources;
  index: number;
  refetchResourcesList: () => void;
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

  const { mutateAsync: deleteResources, isPending: deleteResourcesLoading } = useResourcesDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchResourcesList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  const { mutateAsync: statusResources, isPending: statusResourcesLoading } =
    useResourcesChangeStatus({
      optionalCallback: () => {
        closeStatusModal();
        refetchResourcesList();
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
            router.push(
              `${PAGE_ROUTE.dashboard.resources.list}/${resourcesCatId}/resources/${row?._id}/edit`,
            );
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
            router.push(
              `${PAGE_ROUTE.dashboard.resources.list}/${resourcesCatId}/resources/${row?._id}/content`,
            );
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
            router.push(
              `${PAGE_ROUTE.dashboard.resources.list}/${resourcesCatId}/resources/${row?._id}/faq`,
            );
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
            Are you sure you want to update this Resource's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusResourcesLoading}
              disabled={statusResourcesLoading}
              onClick={() => {
                statusResources({
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
              disabled={statusResourcesLoading}
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
            Are you sure want to delete the Resource?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteResourcesLoading}
              disabled={deleteResourcesLoading}
              onClick={() => {
                deleteResources(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteResourcesLoading}
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
