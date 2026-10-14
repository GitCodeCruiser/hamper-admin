'use client';

import { Box, Typography } from '@mui/material';

import FormBuilder from '@/components/FormBuilder';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function FormBuilderTestPage() {
  return (
    <DashboardHome>
      <CommonCardBox sx={{ bgcolor: '#6b0f1aeb' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700} color="common.white">
            Enquiry Form Builder
          </Typography>
          <Typography color="rgba(255,255,255,.75)" mt={0.75}>
            Build the steps, sections and questions used by Hogani Jets enquiry forms.
          </Typography>
        </Box>
        <FormBuilder />
      </CommonCardBox>
    </DashboardHome>
  );
}
