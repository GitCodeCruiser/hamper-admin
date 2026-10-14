import { Stack, Typography } from '@mui/material';
import toast from 'react-hot-toast';

import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import { useCharterEnquiryAssignSalesPerson } from '@/api/hooks/charter-enquiry/hooks';
import SalesPersonAutocomplete from '@/module/dashboard/components/charter-enquiry/SalesPersonAutocomplete/SalesPersonAutocomplete';
import { TEachCharterEnquiry } from '@/types/apps/charter-enquiry/index.type';
import { TEachSalesPerson } from '@/types/apps/sales-person/index.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const AssignSalesPersonModal = ({
  open,
  onClose,
  selectedSalesPersonId,
  setSelectedSalesPersonId,
  salesPersonDocs,
  salesPersonListLoading,
  salesPersonSearchRaw,
  setSalesPersonSearchRaw,
  row,
}: {
  open: boolean;
  onClose: () => void;
  selectedSalesPersonId: string;
  setSelectedSalesPersonId: (id: string) => void;
  salesPersonDocs: TEachSalesPerson[];
  salesPersonListLoading: boolean;
  salesPersonSearchRaw: string;
  setSalesPersonSearchRaw: (val: string) => void;
  row: TEachCharterEnquiry;
}) => {
  const { mutateAsync: assignSalesPerson, isPending: assignSalesPersonLoading } =
    useCharterEnquiryAssignSalesPerson({
      optionalCallback: () => {
        onClose();
      },
      errorCallback: () => {},
    });

  const handleAssign = () => {
    if (!selectedSalesPersonId) {
      toast.error('Please select a sales person.');
      return;
    }
    assignSalesPerson({ enquiryId: row._id, userId: selectedSalesPersonId });
  };

  return (
    <MuiModalWrapper open={open} onClose={onClose} isAutoClose>
      <CommonModalContentWrap>
        <Stack direction="row" alignItems="center" className="headStack" sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '32px !important' }}>Assign Sales Person</Typography>
        </Stack>

        <SalesPersonAutocomplete
          value={selectedSalesPersonId}
          onChange={setSelectedSalesPersonId}
          salesPersonDocs={salesPersonDocs}
          salesPersonListLoading={salesPersonListLoading}
          setSalesPersonSearchRaw={setSalesPersonSearchRaw}
        />

        <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={assignSalesPersonLoading || !selectedSalesPersonId}
            loading={assignSalesPersonLoading}
            onClick={handleAssign}
          >
            Assign
          </CustomButtonPrimary>
          <CustomButtonPrimary
            variant="outlined"
            color="secondary"
            disableRipple
            disabled={assignSalesPersonLoading}
            onClick={onClose}
          >
            Cancel
          </CustomButtonPrimary>
        </Stack>
      </CommonModalContentWrap>
    </MuiModalWrapper>
  );
};

export default AssignSalesPersonModal;
