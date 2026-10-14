'use client';

import { Box } from '@mui/material';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ISimpleAreaChartProps {
  data: { value: number }[];
  width?: string | number;
  height?: string | number;
  strokeColor?: string;
  gradientColor?: string;
  className?: string;
}

const SimpleAreaChart = ({
  data,
  width = '300px',
  height = '160px',
  strokeColor,
  gradientColor,
  className,
}: ISimpleAreaChartProps) => {
  const gradientId = `gradient-${strokeColor?.replace('#', '')}`;

  return (
    <Box sx={{ width, height }} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={gradientColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis hide />
          <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SimpleAreaChart;
