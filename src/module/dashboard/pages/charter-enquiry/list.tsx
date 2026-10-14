'use client';

import { CheckCircleOutline } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TableCell,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense, useState } from 'react';

import AssignSalesPersonModal from '../../components/charter-enquiry/modal/AssignSalesPersonModal';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import { useCharterEnquiryGetAll } from '@/api/hooks/charter-enquiry/hooks';
import { useSalesPersonGetAll } from '@/api/hooks/sales-person/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import {
  CHARTER_ENQUIRY_STATUSES,
  CHARTER_ENQUIRY_TRIP_TYPES,
  TCharterEnquiryStatusType,
  TCharterEnquiryTripType,
  TEachCharterEnquiry,
} from '@/types/apps/charter-enquiry/index.type';
import { TEachSalesPerson } from '@/types/apps/sales-person/index.type';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';

const tableHeadData = [
  'Action',
  'ID',
  'Client Name',
  'Email Address',
  'Trip Type',
  'Phone Number',
  'Sales Person',
  'Departure Date',
  'Status',
];

const CharterEnquiryMain = () => {
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [charterEnquiryStatusValue, setCharterEnquiryStatusValue] = useState<
    TCharterEnquiryStatusType | ''
  >('');
  const [charterEnquirySearchRaw, setCharterEnquirySearchRaw] = useState('');
  const charterEnquirySearchValue = useDebounce(charterEnquirySearchRaw, 500);
  const [tripTypeValue, setTripTypeValue] = useState<TCharterEnquiryTripType | ''>('');

  const {
    data: charterEnquiryListData,
    isLoading: charterEnquiryListDataLoading,
    // refetch: refetchTheCharterEnquiryList,
  } = useCharterEnquiryGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: charterEnquirySearchValue,
    status: charterEnquiryStatusValue,
    tripType: tripTypeValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Charter Enquiry listing page" />

        <SearchMainComp
          className="home-srch-select"
          isSearchShow
          searchValueGetter={(value) => {
            // console.log(value);
            setCharterEnquirySearchRaw(() => value);
          }}
          renderOtherSelectableComponent={() => (
            <>
              <CustomSelect
                initialValue="Status"
                className="rgt-select"
                value={charterEnquiryStatusValue}
                onChange={(e) => {
                  setCharterEnquiryStatusValue(e.target.value as TCharterEnquiryStatusType | '');
                  setCurrentPageValue(1);
                }}
              >
                <MenuItem value="">All</MenuItem>
                {CHARTER_ENQUIRY_STATUSES.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomSelect
                initialValue="Trip Type"
                className="rgt-select"
                value={tripTypeValue}
                onChange={(e) => {
                  setTripTypeValue(e.target.value as TCharterEnquiryTripType | '');
                  setCurrentPageValue(1);
                }}
              >
                <MenuItem value="">All Trip Types</MenuItem>
                {CHARTER_ENQUIRY_TRIP_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </CustomSelect>
            </>
          )}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[
                100,
                120,
                220,
                220,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
              ]}
              data={
                (charterEnquiryListData?.docs?.length ?? 0) > 0
                  ? (charterEnquiryListData?.docs as TEachCharterEnquiry[])
                  : []
              }
              pageCount={charterEnquiryListData?.meta?.totalPages ?? 0}
              paginationLabel={`${charterEnquiryListData?.meta?.totalDocs ?? 0} Results | Page ${charterEnquiryListData?.meta?.page ?? 1} of ${charterEnquiryListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={charterEnquiryListDataLoading}
              noDataPlaceholder="No Charter Enquiry Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => {
                // Derive display values from the first leg
                const firstLeg = row?.legs?.[0];
                const departureDate = firstLeg?.departureDate
                  ? new Date(firstLeg.departureDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                  : '—';
                const phoneNumber = row?.phone ?? '—';
                const salesPerson = row?.userInfo?.fullName ?? '—';

                // Status colour: Pending → amber, Reviewed → light blue, Resolved → green
                const statusStr = row?.status || 'Pending';
                let statusBgColor = theme.palette.customColors?.colorFFEFBD; // Pending
                if (statusStr === 'Reviewed') {
                  statusBgColor = '#E0F2FE'; // light blue
                } else if (statusStr === 'Resolved') {
                  statusBgColor = theme.palette.customColors?.colorD2F798; // green
                }

                return (
                  <>
                    {/* ID */}
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.leadId ?? '—'}</TableCell>
                    {/* Client Name */}
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {`${row?.firstName ?? ''} ${row?.lastName ?? ''}`.trim() || '—'}
                    </TableCell>

                    {/* Email */}
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row?.email ?? '—'}
                    </TableCell>

                    {/* Trip Type */}
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row?.tripType ?? '—'}
                    </TableCell>

                    {/* Phone number */}
                    <TableCell align="center">{phoneNumber}</TableCell>
                    {/* Sales person */}
                    <TableCell align="center">{salesPerson}</TableCell>

                    {/* Departure Date (first leg) */}
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {departureDate}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Box
                        className="status-chip"
                        sx={{
                          backgroundColor: statusBgColor,
                        }}
                      >
                        {row?.status}
                      </Box>
                    </TableCell>

                    {/*
                      Removed old placeholder columns (fields no longer exist on TEachCharterEnquiry):
                      <TableCell>{row?.description}</TableCell>
                      <TableCell>{row?.title}</TableCell>
                      <TableCell>{row?.company}</TableCell>
                    */}
                  </>
                );
              }}
              renderActions={(row, index) => <CharterEnquiryActionComp index={index} row={row} />}
            />
          </Suspense>
        </ErrorBoundary>
      </CommonCardBox>
    </DashboardHome>
  );
};

export default CharterEnquiryMain;

// ---------------------------------------------------------------------------
// Action menu per row
// ---------------------------------------------------------------------------

const CharterEnquiryActionComp = ({ row, index }: { row: TEachCharterEnquiry; index: number }) => {
  const router = useRouter();
  const theme = useTheme();

  // Row menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  // Assign sales person modal state
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedSalesPersonId, setSelectedSalesPersonId] = useState<string>('');
  const [salesPersonSearchRaw, setSalesPersonSearchRaw] = useState('');
  const salesPersonSearchValue = useDebounce(salesPersonSearchRaw, 500);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, idx: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(idx);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };

  // Fetch all active sales persons for the dropdown
  const { data: salesPersonListData, isLoading: salesPersonListLoading } = useSalesPersonGetAll({
    page: 1,
    perPage: 20,
    search: salesPersonSearchValue,
    status: 'active',
  });

  const salesPersonDocs = (salesPersonListData?.docs ?? []) as TEachSalesPerson[];

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
            router.push(`${PAGE_ROUTE.dashboard.charterEnquiry.list}/${row?._id}/view`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <VisibilityOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">View</Typography>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={
            row?.userId
              ? undefined
              : () => {
                handleMenuClose();
                setSelectedSalesPersonId('');
                setAssignModalOpen(true);
              }
          }
          sx={{ gap: 1, py: 1, px: 2, cursor: row?.userId ? 'not-allowed' : 'pointer' }}
        >
          {row?.userId ? (
            <>
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <CheckCircleOutline fontSize="small" sx={{ color: theme.palette.success.main }} />
              </ListItemIcon>
              <Typography variant="body2" color="success.main">
                Already Assigned
              </Typography>
            </>
          ) : (
            <>
              {' '}
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <PersonAddOutlinedIcon
                  fontSize="small"
                  sx={{ color: theme.palette.text.secondary }}
                />
              </ListItemIcon>
              <Typography variant="body2">Assign Sales Person</Typography>
            </>
          )}
        </MenuItem>
      </Menu>

      {/* Assign Sales Person Modal */}
      <AssignSalesPersonModal
        open={assignModalOpen}
        onClose={() => {
          setAssignModalOpen(false);
          setSelectedSalesPersonId('');
          setSalesPersonSearchRaw('');
        }}
        selectedSalesPersonId={selectedSalesPersonId}
        setSelectedSalesPersonId={setSelectedSalesPersonId}
        salesPersonDocs={salesPersonDocs}
        salesPersonListLoading={salesPersonListLoading}
        salesPersonSearchRaw={salesPersonSearchRaw}
        setSalesPersonSearchRaw={setSalesPersonSearchRaw}
        row={row}
      />
    </>
  );
};
