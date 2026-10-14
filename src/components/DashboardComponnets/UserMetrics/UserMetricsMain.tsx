'use client';

import { Box, Grid, useTheme } from '@mui/material';

import { usersData } from '../../../../json/mocks/demo.mock';
import MetricsChart from '../AllCharts/MetricsChart/MetricsChart';
import CommonWidget from '../CommonWidget';

const data1 = [
  { date: '10 March', value: 45 },
  { date: '11 March', value: 78 },
  { date: '12 March', value: 60 },
  { date: '13 March', value: 120 },
  { date: '14 March', value: 75 },
  { date: '15 March', value: 115 },
];

const data2 = [
  { date: 'January', value: 24 },
  { date: 'February', value: 31 },
  { date: 'March', value: 23 },
  { date: 'April', value: 49 },
  { date: 'May', value: 42 },
  { date: 'June', value: 27 },
  { date: 'July', value: 32 },
];

const data3 = [
  { date: 'January', value: 24 },
  { date: 'February', value: 31 },
  { date: 'March', value: 23 },
  { date: 'April', value: 49 },
  { date: 'May', value: 42 },
  { date: 'June', value: 27 },
  { date: 'July', value: 32 },
];

import UserGrowthPieChart from '../AllCharts/UserGrowthPieChart/UserGrowthPieChart';
import SectionHeading from '../SectionHeading';

import { UserMetricsMainWrapper } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardComponentStyled/UserMetricsMainStyled';

const UserMetricsMain = () => {
  const theme = useTheme();
  return (
    <UserMetricsMainWrapper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, xl: 6 }}>
          <MetricsChart
            title="Daily Active Users"
            value="2,450"
            percentage={5.2}
            data={data1}
            color={theme.palette.customColors?.colorB2535F || '#30B935'}
            showGradient={false}
            lineType="linear"
            yAxisTicks={[20, 40, 60, 80, 100, 120, 140]}
            className="chartBox"
            height="400px"
            width="100%"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 6 }}>
          <MetricsChart
            title="Monthly Active Users"
            value="18,200"
            percentage={8.7}
            data={data2}
            color={theme.palette.customColors?.colorB2535F || '#FF861C'}
            showGradient={true}
            lineType="monotone"
            yAxisTicks={[0, 10, 20, 30, 40, 50, 60]}
            yAxisTickFormatter={(val: number | string) => `${val}k`}
            tooltipValueFormatter={(val: number | string) => `${val}k`}
            className="chartBox"
            height="400px"
            width="100%"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: '24px ' }}>
        {usersData.map((item, index) => (
          <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
            <CommonWidget key={index} {...item} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: '24px ', alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 6, xl: 6 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <SectionHeading heading="New vs Returning Users" sx={{ mb: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <UserGrowthPieChart />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 6 }} sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <SectionHeading heading="User Growth" sx={{ mb: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <MetricsChart
                title=""
                value=""
                data={data3}
                color={theme.palette.customColors?.colorB2535F || '#0078D7'}
                showGradient={false}
                lineType="step"
                yAxisTicks={[0, 10, 20, 30, 40, 50, 60]}
                yAxisTickFormatter={(val: number | string) => `${val}k`}
                tooltipValueFormatter={(val: number | string) => `${val}k`}
                className="chartBox"
                height="400px"
                width="100%"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </UserMetricsMainWrapper>
  );
};

export default UserMetricsMain;
