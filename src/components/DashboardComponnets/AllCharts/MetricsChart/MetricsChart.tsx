'use client';

import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface IChartDataPoint {
  date: string;
  value: number;
  [key: string]: string | number;
}

export interface IMetricsChartProps {
  title?: string;
  value?: string | number;
  percentage?: number;
  data: IChartDataPoint[];
  color?: string;
  showGradient?: boolean;
  lineType?: 'linear' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
  yAxisTickFormatter?: (val: string | number) => string;
  yAxisTicks?: number[];
  tooltipLabel?: string;
  tooltipValueFormatter?: (val: string | number) => string | number;
  className?: string;
  width: string;
  height: string;
}

interface ICustomTooltipProps {
  active?: boolean;
  payload?: { value: string | number }[];
  label?: string;
  tooltipLabel?: string;
  tooltipValueFormatter?: (val: string | number) => string | number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  tooltipLabel,
  tooltipValueFormatter,
  coordinate,
}: ICustomTooltipProps & { coordinate?: { x: number; y: number } }) => {
  const theme = useTheme();
  if (active && payload && payload.length && coordinate) {
    const val = payload[0]?.value as string | number;
    const displayValue = tooltipValueFormatter ? tooltipValueFormatter(val) : val;
    return (
      <Box
        sx={{
          minWidth: '148px',
          position: 'absolute',
          left: coordinate.x,
          top: coordinate.y,
          transform: 'translate(-50%, -100%)',
          mt: '-14px',
          transition: 'all 0.2s ease',
          bgcolor: theme.palette.grey[600],
          color: theme.palette.common.white,
          p: '12px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          border: `1px solid ${theme.palette.customColors.colorB2535F}`,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '6px 6px 0',
            borderStyle: 'solid',
            borderColor: `${theme.palette.grey[600]} transparent transparent transparent`,
            display: 'block',
            width: 0,
            zIndex: 2,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-7px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '7px 7px 0',
            borderStyle: 'solid',
            borderColor: `${theme.palette.customColors.colorB2535F} transparent transparent transparent`,
            display: 'block',
            width: 0,
            zIndex: 1,
          },
        }}
      >
        <Typography fontSize={12} mb={0.5} fontWeight={500}>
          {tooltipLabel ? `${tooltipLabel} : ` : ''}
          {displayValue}
        </Typography>
        <Typography fontSize={12} color="white">
          Date : {label}
        </Typography>
      </Box>
    );
  }
  return null;
};

const MetricsChart: React.FC<IMetricsChartProps> = ({
  title,
  value,
  percentage,
  data,
  color,
  showGradient = false,
  lineType = 'linear',
  yAxisTickFormatter = (val) => val.toString(),
  yAxisTicks,
  tooltipLabel = 'Users',
  tooltipValueFormatter,
  className,
  width,
  height,
}) => {
  const theme = useTheme();
  const gradientId = `colorUv-${color?.replace('#', '')}`;
  const axisColor = theme.palette.customColors?.colorB2535F || '#444444';
  const gridColor = theme.palette.grey[600] || '#333333';
  const tickColor = theme.palette.secondary.dark || '#8b8b8b';
  const cursorColor = theme.palette.customColors?.colorB2535F || '#555555';

  return (
    <Box className={className}>
      {title && (
        <Typography
          variant="body1"
          sx={{ color: theme.palette.customColors.light, fontSize: 15, fontWeight: 500, mb: 1 }}
        >
          {title}
        </Typography>
      )}
      {value !== undefined && (
        <Box display="flex" alignItems="end" mb={4}>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.common.white, fontWeight: 'bold', mr: 2, lineHeight: 1 }}
          >
            {value}
          </Typography>
          {percentage !== undefined && (
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  percentage >= 0
                    ? theme.palette.customColors.colorB2535F
                    : theme.palette.error.main,
                fontWeight: 'bold',
                mb: 0.5,
              }}
            >
              ({percentage >= 0 ? `+${percentage}` : percentage}%)
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: -18, bottom: 10 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
              <marker
                id="arrowHeadX"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill={axisColor} />
              </marker>
              <marker
                id="arrowHeadY"
                markerWidth="10"
                markerHeight="10"
                refX="1"
                refY="3"
                orient="auto-start-reverse"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill={axisColor} />
              </marker>
            </defs>
            <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              axisLine={{ stroke: axisColor, markerEnd: 'url(#arrowHeadX)' }}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 13, dy: 15 }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              axisLine={{ stroke: axisColor, markerStart: 'url(#arrowHeadY)' }}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 13, dx: -10 }}
              tickFormatter={yAxisTickFormatter}
              ticks={yAxisTicks}
              domain={
                yAxisTicks && yAxisTicks.length > 0
                  ? ([yAxisTicks[0]!, yAxisTicks[yAxisTicks.length - 1]!] as [number, number])
                  : undefined
              }
            />
            <Tooltip
              content={
                <CustomTooltip
                  tooltipLabel={tooltipLabel}
                  tooltipValueFormatter={tooltipValueFormatter}
                />
              }
              cursor={{ stroke: cursorColor, strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type={lineType}
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fillOpacity={showGradient ? 1 : 0}
              fill={showGradient ? `url(#${gradientId})` : 'transparent'}
              activeDot={{ r: 6, strokeWidth: 3, stroke: theme.palette.common.white, fill: color }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MetricsChart;
