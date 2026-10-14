'use client';
import { Grid, useTheme } from '@mui/material';

import { userActivityData, userBarChartData } from '../../../../json/mocks/userActivity.mock';
import DynamicBarChart from '../AllCharts/DynamicBarChart/DynamicBarChart';
import DynamicMultiLineChart from '../AllCharts/DynamicMultiLineChart/DynamicMultiLineChart';

import { UserActivityMainWrapper } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardComponentStyled/UserActivityMainStyled';

const UserActivityMain = () => {
  const theme = useTheme();

  const chartLines = [
    {
      key: 'sessions',
      color: theme.palette.customColors?.colorB2535F || '#0078D7',
      label: 'Sessions',
    },
    {
      key: 'activeUsers',
      color: theme.palette.customColors?.colorB2535F || '#30B935',
      label: 'Active Users',
    },
    {
      key: 'events',
      color: theme.palette.customColors?.colorB2535F || '#FF861C',
      label: 'Events',
    },
  ];

  return (
    <UserActivityMainWrapper>
      <DynamicMultiLineChart
        data={userActivityData}
        lines={chartLines}
        xAxisKey="date"
        yAxisTicks={[0, 10, 20, 30, 40, 60, 80]}
        height={500}
        className="chartBox"
      />
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DynamicBarChart
            data={userBarChartData}
            barKey="value"
            xAxisKey="id"
            height={400}
            className="chartBox"
          />
        </Grid>
      </Grid>
    </UserActivityMainWrapper>
  );
};

export default UserActivityMain;
