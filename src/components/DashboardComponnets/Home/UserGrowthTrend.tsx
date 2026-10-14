'use client';

import { Box, MenuItem, useTheme } from '@mui/material';

import MetricsChart from '../AllCharts/MetricsChart/MetricsChart';
import SectionHeading from '../SectionHeading';

import { UserGrowthTrendSection } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardHomeStyled';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';

const UserGrowthTrend = () => {
  const theme = useTheme();

  const data2 = [
    { date: '10 March', value: 24 },
    { date: '11 March', value: 31 },
    { date: '12 March', value: 23 },
    { date: '13 March', value: 49 },
    { date: '14 March', value: 42 },
    { date: '15 March', value: 27 },
    { date: '16 March', value: 32 },
    { date: '17 March', value: 50 },
    { date: '18 March', value: 60 },
    { date: '19 March', value: 55 },
    { date: '20 March', value: 50 },
    { date: '21 March', value: 45 },
  ];

  return (
    <UserGrowthTrendSection>
      <SectionHeading heading="User growth trend" mb={2.5}>
        <CustomSelect
          // initialvalue="Last 30 days"
          className="select-day"
        >
          <MenuItem value="7">Last 7 days</MenuItem>
          <MenuItem value="30">Last 30 days</MenuItem>
          <MenuItem value="60">Last 60 days</MenuItem>
        </CustomSelect>
      </SectionHeading>
      <Box className="user-growth">
        <MetricsChart
          data={data2}
          color={theme.palette.customColors.colorB2535F}
          showGradient={true}
          lineType="monotone"
          yAxisTicks={[0, 10, 20, 30, 40, 50, 60]}
          yAxisTickFormatter={(val: number | string) => `${val}k`}
          tooltipValueFormatter={(val: number | string) => `${val}k`}
          height="390px"
          width="100%"
        />
      </Box>
    </UserGrowthTrendSection>
  );
};

export default UserGrowthTrend;
