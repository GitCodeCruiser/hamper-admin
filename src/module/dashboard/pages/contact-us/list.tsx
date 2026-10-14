'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box,
  Divider,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TableCell,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense, useCallback, useMemo, useState } from 'react';
import { usePhoneInput } from 'react-international-phone';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import { useContactUsDelete, useContactUsGetAll } from '@/api/hooks/contact-us/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { HeadingStack } from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachContactUs } from '@/types/apps/contact-us/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = ['Action', 'Full Name', 'Email', 'Phone', 'Message', 'Replied?'];

const ContactUsMain = () => {
  // const router = useRouter();
  // const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [contactUsStatusValue, setContactUsStatusValue] = useState<TStatusChangeType | ''>('');
  const [contactUsSearchRaw, setContactUsSearchRaw] = useState('');
  const contactUsSearchValue = useDebounce(contactUsSearchRaw, 500);

  const {
    data: contactUsListData,
    isLoading: contactUsListDataLoading,
    refetch: refetchTheContactUsList,
  } = useContactUsGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: contactUsSearchValue,
    status: contactUsStatusValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <HeadingStack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Typography variant="h3">Contact Us Form Response</Typography>
        </HeadingStack>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow={false}
          isSearchShow
          searchValueGetter={(value) => {
            // console.log(value);
            setContactUsSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            // console.log(value);
            setContactUsStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 200, 300, 300, 400, undefined]}
              data={
                (contactUsListData?.docs?.length ?? 0 > 0)
                  ? (contactUsListData?.docs as TEachContactUs[])
                  : []
              }
              pageCount={contactUsListData?.meta?.totalPages ?? 0}
              paginationLabel={`${contactUsListData?.meta?.totalDocs ?? 0} Results | Page ${contactUsListData?.meta?.page ?? 1} of ${contactUsListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={contactUsListDataLoading}
              noDataPlaceholder="No Contact Us Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <ShowEachContactUs row={row} key={`contact-us-${row._id}`} />
                // <>
                //   <TableCell
                //     sx={{
                //       whiteSpace: 'nowrap',
                //       overflow: 'hidden',
                //       textOverflow: 'ellipsis',
                //     }}
                //   >
                //     {row?.message}
                //   </TableCell>
                //   <TableCell>{row?.fullName}</TableCell>
                //   <TableCell
                //     sx={{
                //       whiteSpace: 'nowrap',
                //       overflow: 'hidden',
                //       textOverflow: 'ellipsis',
                //     }}
                //   >
                //     {row?.email}
                //   </TableCell>
                //   <TableCell>{row?.isReplied ? 'Yes' : 'No'}</TableCell>
                //   {/* <TableCell>
                //     <Box
                //       className="status-chip"
                //       sx={{
                //         backgroundColor:
                //           row.status === 'Active'
                //             ? theme.palette.customColors?.colorD2F798
                //             : theme.palette.customColors?.colorFFEFBD,
                //       }}
                //     >
                //       {row?.status}
                //     </Box>
                //   </TableCell> */}
                // </>
              )}
              renderActions={(row, index) => (
                <ContactUsActionComp
                  index={index}
                  row={row}
                  refetchCityList={() => {
                    refetchTheContactUsList();
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

export default ContactUsMain;

const ShowEachContactUs = ({ row }: { row: TEachContactUs }) => {
  const { phoneVal, rawCountryCode, rawPhone } = useMemo(() => {
    const rawCountryCode = row?.countryCode ?? '';
    const rawPhone = row?.phone ?? '';
    const phoneVal =
      rawCountryCode && !rawCountryCode.startsWith('+')
        ? `+${rawCountryCode}${rawPhone}`
        : `${rawCountryCode}${rawPhone}`;

    return { phoneVal, rawCountryCode, rawPhone };
  }, [row?.countryCode, row?.phone]);

  const { inputValue: formattedPhone } = usePhoneInput({
    value: phoneVal,
    disableDialCodePrefill: true,
  });

  return (
    <>
      <TableCell>{row?.fullName}</TableCell>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {row?.email}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {formattedPhone || `${rawCountryCode}${rawPhone}`}
      </TableCell>
      <TableCell>
        <Box className="clamp-text">{row?.message}</Box>
      </TableCell>
      <TableCell>{row?.isReplied ? 'Yes' : 'No'}</TableCell>
      {/* <TableCell>
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
                  </TableCell> */}
    </>
  );
};

const ContactUsActionComp = ({
  row,
  index,
  refetchCityList,
}: {
  row: TEachContactUs;
  index: number;
  refetchCityList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  // const [statusModal, setStatusModal] = useState(false);

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

  // const openStatusModal = useCallback(() => {
  //   setStatusModal(true);
  //   handleMenuClose();
  // }, [setStatusModal]);

  // const closeStatusModal = useCallback(() => {
  //   setStatusModal(false);
  // }, [setStatusModal]);

  const openReviewModal = useCallback(() => {
    setReviewModal(true);
    handleMenuClose();
  }, [setReviewModal]);

  const closeReviewModal = useCallback(() => {
    setReviewModal(false);
  }, [setReviewModal]);

  const { mutateAsync: deleteContactUs, isPending: deleteContactUsLoading } = useContactUsDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchCityList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  // const { mutateAsync: statusContactUs, isPending: statusContactUsLoading } = useContactUsSendReply(
  //   {
  //     optionalCallback: () => {
  //       closeStatusModal();
  //       refetchCityList();
  //     },
  //     errorCallback: () => {
  //       closeStatusModal();
  //     },
  //   },
  // );

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
        {row?.isReplied ? (
          <MenuItem
            onClick={() => {
              openReviewModal();
            }}
            sx={{ gap: 1, py: 1, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <QuickreplyIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </ListItemIcon>
            <Typography variant="body2">View Replied</Typography>
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              router.push(`${PAGE_ROUTE.dashboard.contactUs.list}/${row?._id}/reply`);
              handleMenuClose();
            }}
            sx={{ gap: 1, py: 1, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ReplyIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </ListItemIcon>
            <Typography variant="body2">Reply</Typography>
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5 }} />

        {/* <MenuItem
          onClick={() => {
            openStatusModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <ChangeCircleIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Status</Typography>
        </MenuItem> */}

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

      {/* Review Message */}
      <MuiModalWrapper
        open={reviewModal}
        onClose={closeReviewModal}
        isAutoClose={false}
        maxWidth="md"
        fullWidth
      >
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack">
            <Typography sx={{ fontSize: '32px !important' }}>Information!</Typography>
          </Stack>

          <InputLabel
            sx={{
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Message:
          </InputLabel>
          <Typography>{row?.message}</Typography>
          <br />
          <InputLabel
            sx={{
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Replied:
          </InputLabel>
          <Typography>
            {/* This is test reply message will be replaced after data coming from backend! */}
            {row?.adminReplies?.[0]?.message ?? '-'}
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary variant="outlined" color="primary" onClick={closeReviewModal}>
              Close
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Status Modal */}
      {/* <MuiModalWrapper open={statusModal} onClose={closeStatusModal} isAutoClose={false}>
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
            Are you sure you want to update this contact us's status?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={statusContactUsLoading}
              disabled={statusContactUsLoading}
              onClick={() => {
                statusContactUs({
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
              disabled={statusContactUsLoading}
              onClick={closeStatusModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper> */}

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
            Are you sure want to delete the contact us?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteContactUsLoading}
              disabled={deleteContactUsLoading}
              onClick={() => {
                deleteContactUs(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteContactUsLoading}
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
