'use client';

import { Box, List, ListItem, Stack, StackProps, styled, Typography } from '@mui/material';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

export default function PieChartMain({ data, chartSize, ...props }: any & StackProps) {
  const innerRadius = Math.round(chartSize * 0.22);
  const outerRadius = Math.round(chartSize * 0.48);

  const chartData = data.map((item: any) => ({ ...item, fill: item.color }));

  return (
    <PieChartWrap direction="row" alignItems="center" flexWrap="wrap" {...props}>
      <Box sx={{ width: chartSize, height: chartSize }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={4}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <List disablePadding className="custom-legend">
        {data.map((entry: any) => (
          <ListItem key={entry.name} disablePadding>
            <Stack direction="row" alignItems="center" className="st-lft">
              <Typography
                variant="caption"
                className="dot-color"
                sx={{ backgroundColor: entry.color }}
              />
              <Typography variant="body2">{entry.name}</Typography>
            </Stack>
            {entry.count !== undefined && (
              <Typography variant="body2">{entry.count.toLocaleString()}</Typography>
            )}
            <Typography variant="body2">{entry.value}%</Typography>
          </ListItem>
        ))}
      </List>
    </PieChartWrap>
  );
}

export const PieChartWrap = styled(Stack)`
  gap: 80px;

  @media (max-width: 1899px) {
    gap: 40px;
  }

  @media (max-width: 599px) {
    justify-content: center;
  }

  .custom-legend {
    background-color: ${({ theme }) => theme.palette.grey[50]};
    border: 1px solid #ffffff1a;
    padding: 16px;
    border-radius: 20px;
    width: 100%;
    max-width: 240px;

    li {
      align-items: center;
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: 18px;
      }

      .st-lft {
        gap: 12px;
      }

      .dot-color {
        width: 18px;
        height: 18px;
        display: inline-block;
        border-radius: 4px;
      }

      p {
        font-weight: 500;
        color: ${({ theme }) => theme.palette.common.white};

        @media (max-width: 599px) {
          font-size: 14px;
        }
      }
    }
  }
`;
