import { Stack, Typography } from '@mui/material';

import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const ChangeSalesStatusModal = ({
  open,
  onClose,
  onConfirm,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) => {
  return (
    <MuiModalWrapper open={open} onClose={onClose} isAutoClose={false}>
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
          Are you sure you want to update this Sales Person's status?
        </Typography>

        <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            loading={loading}
            disabled={loading}
            onClick={onConfirm}
          >
            Yes
          </CustomButtonPrimary>
          <CustomButtonPrimary
            variant="outlined"
            color="primary"
            disabled={loading}
            onClick={onClose}
          >
            No
          </CustomButtonPrimary>
        </Stack>
      </CommonModalContentWrap>
    </MuiModalWrapper>
  );
};

export default ChangeSalesStatusModal;
