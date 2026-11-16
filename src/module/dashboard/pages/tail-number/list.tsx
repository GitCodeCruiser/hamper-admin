'use client';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestoreIcon from '@mui/icons-material/Restore';
import WestIcon from '@mui/icons-material/West';
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
import { MouseEvent, ReactElement, Suspense, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import { mainWebsiteUrl } from '@/api/endpoints';
import { useAircraftGet, useAircraftListing } from '@/api/hooks/aircraft/hooks';
import {
  useTailNumberChangeStatus,
  useTailNumberDelete,
  useTailNumberGetAll,
  useTailNumberRestore,
} from '@/api/hooks/tail-number/hooks';
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
import { TEachTailNumber, TTailNumberStatus } from '@/types/apps/tail-number/index.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

type TTailNumberListProps = {
  /** When set, the list is scoped to this aircraft (opened from the aircraft list / edit page) */
  aircraftId?: string;
};

/** Add / edit pages return to the list they were opened from */
export const tailListUrl = (aircraftId?: string) =>
  aircraftId
    ? PAGE_ROUTE.dashboard.availableAircraft.aircraftTailNumbers(aircraftId)
    : PAGE_ROUTE.dashboard.tailNumbers.list;

const TailNumberListMain = ({ aircraftId }: TTailNumberListProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isScoped = !!aircraftId;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT_FOR_PAGINATION);
  const [status, setStatus] = useState<TTailNumberStatus | ''>('');
  const [aircraftFilter, setAircraftFilter] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);
  const [searchRaw, setSearchRaw] = useState('');
  const search = useDebounce(searchRaw, 500);

  const { data: scopedAircraft } = useAircraftGet({ id: aircraftId ?? '' });
  const { data: aircraftList } = useAircraftListing();

  const {
    data: tailData,
    isLoading: tailLoading,
    refetch,
  } = useTailNumberGetAll({
    page,
    perPage: limit,
    search,
    aircraftId: aircraftId || aircraftFilter || undefined,
    status,
    isDeleted: showDeleted,
    sortField: 'order',
    sortOrder: 'asc',
  });

  const tableHeadData = [
    'Action',
    'Tail Number',
    ...(isScoped ? [] : ['Aircraft']),
    'Year',
    'Seats',
    'Status',
    'Order',
    'Last Updated Date',
  ];

  const addUrl = `${PAGE_ROUTE.dashboard.tailNumbers.add}${aircraftId ? `?aircraftId=${aircraftId}` : ''}`;

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading
          title={isScoped ? `Tail numbers: ${scopedAircraft?.title ?? ''}` : 'Tail numbers'}
        >
          <Stack direction="row" gap={2} flexWrap="wrap">
            {isScoped ? (
              <CustomButtonPrimary
                variant="outlined"
                color="secondary"
                startIcon={<WestIcon />}
                onClick={() => router.push(PAGE_ROUTE.dashboard.availableAircraft.list)}
              >
                Back to Aircraft
              </CustomButtonPrimary>
            ) : null}
            <CustomButtonPrimary
              variant="contained"
              color="secondary"
              onClick={() => router.push(addUrl)}
            >
              Add Tail Number +
            </CustomButtonPrimary>
          </Stack>
        </SectionHeading>

        <SearchMainComp
          className="home-srch-select"
          isSearchShow
          searchPlaceHolder="Search by tail number"
          searchValueGetter={(value) => {
            setSearchRaw(value);
            setPage(1);
          }}
          renderOtherSelectableComponent={() => (
            <>
              {!isScoped ? (
                <CustomSelect
                  initialValue="Aircraft"
                  className="rgt-select"
                  value={aircraftFilter}
                  onChange={(e) => {
                    setAircraftFilter(e.target.value as string);
                    setPage(1);
                  }}
                >
                  <MenuItem value="">All Aircraft</MenuItem>
                  {((aircraftList as TEachAircraft[] | undefined) ?? []).map((a) => (
                    <MenuItem value={a._id} key={a._id}>
                      {a.title}
                    </MenuItem>
                  ))}
                </CustomSelect>
              ) : null}
              <CustomSelect
                initialValue="Status"
                className="rgt-select"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as TTailNumberStatus | '');
                  setPage(1);
                }}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </CustomSelect>
              <CustomSelect
                initialValue="Records"
                className="rgt-select"
                value={showDeleted ? 'deleted' : 'live'}
                onChange={(e) => {
                  setShowDeleted(e.target.value === 'deleted');
                  setPage(1);
                }}
              >
                <MenuItem value="live">Current</MenuItem>
                <MenuItem value="deleted">Deleted</MenuItem>
              </CustomSelect>
            </>
          )}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              data={(tailData?.docs as TEachTailNumber[] | undefined) ?? []}
              pageCount={tailData?.meta?.totalPages ?? 0}
              paginationLabel={`${tailData?.meta?.totalDocs ?? 0} Results | Page ${tailData?.meta?.page ?? 1} of ${tailData?.meta?.totalPages ?? 1}`}
              page={page}
              limit={limit}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
              dataLoading={tailLoading}
              noDataPlaceholder="No Tail Numbers Found!"
              onPageChange={(_e, newValue) => setPage(newValue)}
              renderRow={(row) => (
                <>
                  <TableCell sx={{ fontWeight: 600 }}>{row.tailNumber}</TableCell>
                  {!isScoped ? <TableCell>{row.aircraft?.title ?? '-'}</TableCell> : null}
                  <TableCell>{row.yearOfManufacture ?? '-'}</TableCell>
                  <TableCell>{row.seats ?? '-'}</TableCell>
                  <TableCell>
                    <Box
                      className="status-chip"
                      sx={{
                        backgroundColor:
                          row.status === 'Published'
                            ? theme.palette.customColors?.colorD2F798
                            : theme.palette.customColors?.colorFFEFBD,
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>{row.order ?? 0}</TableCell>
                  <TableCell>
                    {row.updatedAt
                      ? dayjs(row.updatedAt).format(humanReadableDateTimeFormatForListing)
                      : '-'}
                  </TableCell>
                </>
              )}
              renderActions={(row, index) => (
                <TailNumberActionComp
                  index={index}
                  row={row}
                  isDeletedView={showDeleted}
                  returnAircraftId={aircraftId}
                  refetchList={() => refetch()}
                />
              )}
            />
          </Suspense>
        </ErrorBoundary>
      </CommonCardBox>
    </DashboardHome>
  );
};

export default TailNumberListMain;

type TConfirmAction = 'status' | 'delete' | 'restore' | null;

const TailNumberActionComp = ({
  row,
  index,
  isDeletedView,
  returnAircraftId,
  refetchList,
}: {
  row: TEachTailNumber;
  index: number;
  isDeletedView: boolean;
  returnAircraftId?: string;
  refetchList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<TConfirmAction>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, i: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(i);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };
  const openConfirm = (action: TConfirmAction) => {
    setConfirm(action);
    handleMenuClose();
  };
  const closeConfirm = () => setConfirm(null);

  const callbacks = {
    optionalCallback: () => {
      closeConfirm();
      refetchList();
    },
    errorCallback: closeConfirm,
  };
  const { mutateAsync: changeStatus, isPending: statusLoading } =
    useTailNumberChangeStatus(callbacks);
  const { mutateAsync: deleteTail, isPending: deleteLoading } = useTailNumberDelete(callbacks);
  const { mutateAsync: restoreTail, isPending: restoreLoading } = useTailNumberRestore(callbacks);
  const busy = statusLoading || deleteLoading || restoreLoading;

  const isPublished = row.status === 'Published';
  const liveUrl =
    row.aircraft?.slug && mainWebsiteUrl
      ? `${mainWebsiteUrl}/aircraft/${row.aircraft.slug}/${row.slug}/`
      : '';
  const editUrl = `${PAGE_ROUTE.dashboard.tailNumbers.edit(row._id)}${
    returnAircraftId ? `?aircraftId=${returnAircraftId}` : ''
  }`;

  const confirmText: Record<Exclude<TConfirmAction, null>, string> = {
    status: isPublished
      ? `Unpublish ${row.tailNumber}? The page will return 404 until it is published again.`
      : `Publish ${row.tailNumber}? The page will go live on the website.`,
    delete: `Delete ${row.tailNumber}? You can restore it later from the "Deleted" view.`,
    restore: `Restore ${row.tailNumber}?`,
  };

  const runConfirm = () => {
    if (confirm === 'status')
      changeStatus({ id: row._id, status: isPublished ? 'Draft' : 'Published' });
    if (confirm === 'delete') deleteTail(row._id);
    if (confirm === 'restore') restoreTail(row._id);
  };

  const iconSx = { color: theme.palette.text.secondary };
  const dangerSx = { color: theme.palette.error.main };
  const menuItem = (key: string, label: string, icon: ReactElement, onClick: () => void) => (
    <MenuItem key={key} onClick={onClick} sx={{ gap: 1, py: 1, px: 2 }}>
      <ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
      <Typography variant="body2">{label}</Typography>
    </MenuItem>
  );

  // MUI Menu expects MenuItems as direct children, so build a flat array
  const menuItems: ReactElement[] = [];
  if (isDeletedView) {
    menuItems.push(
      menuItem('restore', 'Restore', <RestoreIcon fontSize="small" sx={iconSx} />, () =>
        openConfirm('restore'),
      ),
    );
  } else {
    menuItems.push(
      menuItem('edit', 'Edit', <EditOutlinedIcon fontSize="small" sx={iconSx} />, () => {
        router.push(editUrl);
        handleMenuClose();
      }),
    );
    // FAQ is hidden for now (the tail page doesn't show FAQs). The route and page still exist:
    // add this item back (with the QuizOutlinedIcon import) to restore the editor.
    if (isPublished && liveUrl) {
      menuItems.push(
        menuItem('view', 'View live page', <OpenInNewIcon fontSize="small" sx={iconSx} />, () => {
          window.open(liveUrl, '_blank', 'noopener');
          handleMenuClose();
        }),
      );
    }
    menuItems.push(
      <Divider key="divider" sx={{ my: 0.5 }} />,
      menuItem(
        'status',
        isPublished ? 'Unpublish' : 'Publish',
        <ChangeCircleIcon fontSize="small" sx={dangerSx} />,
        () => openConfirm('status'),
      ),
      menuItem('delete', 'Delete', <DeleteOutlineIcon fontSize="small" sx={dangerSx} />, () =>
        openConfirm('delete'),
      ),
    );
  }

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
        {menuItems}
      </Menu>

      <MuiModalWrapper open={!!confirm} onClose={closeConfirm} isAutoClose={false}>
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack">
            <Typography sx={{ fontSize: '32px !important' }}>Alert!</Typography>
          </Stack>
          <Typography sx={{ textAlign: 'center', fontSize: '16px', fontWeight: '600' }}>
            {confirm ? confirmText[confirm] : ''}
          </Typography>
          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={busy}
              disabled={busy}
              onClick={runConfirm}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={busy}
              onClick={closeConfirm}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>
    </>
  );
};
