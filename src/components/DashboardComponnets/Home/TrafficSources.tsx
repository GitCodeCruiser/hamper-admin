'use client';

import { Box, BoxProps } from '@mui/material';

import PieChartMain from '../AllCharts/PieChartMain';
import SectionHeading from '../SectionHeading';

import { ToppagesSection } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardHomeStyled';

const TrafficSources = ({ ...props }: BoxProps) => {
  return (
    <ToppagesSection {...props}>
      <SectionHeading heading="Traffic sources" mb={2.5} />
      <Box className="chart-outer">
        <PieChartMain
          chartSize={248}
          data={[
            { name: 'Organic', value: 42, color: '#2A6FB8' },
            { name: 'Direct', value: 25, color: '#34A873' },
            { name: 'Referral', value: 18, color: '#B35BA0' },
            { name: 'Social', value: 10, color: '#734DB5' },
            { name: 'Paid', value: 5, color: '#FEBA3D' },
          ]}
        />
      </Box>
    </ToppagesSection>
  );
};

export default TrafficSources;
