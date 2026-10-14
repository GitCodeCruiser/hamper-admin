'use client';
import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { DynamicMultiLineChartWrapper } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardComponentStyled/DynamicMultiLineChartStyled';

interface ITooltipPayload {
  color: string;
  dataKey: string;
  value: number;
}

interface ICustomTooltipProps {
  active?: boolean;
  payload?: ITooltipPayload[];
  label?: string;
  lines: any[];
}

const CustomTooltip: React.FC<ICustomTooltipProps> = ({ active, payload, label, lines }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-date">{label}</p>
        {(payload as ITooltipPayload[]).map((item: ITooltipPayload, index: number) => {
          const lineConfig = lines.find((l: any) => l.key === item.dataKey);
          return (
            <div className="tooltip-item" key={index}>
              <div className="tooltip-label">
                <div className="tooltip-color" style={{ backgroundColor: item.color }} />
                <span>{lineConfig?.label} :</span>
              </div>
              <span className="tooltip-value">{item.value?.toLocaleString()}k</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

const DynamicMultiLineChart: React.FC<any & { className?: string }> = ({
  data,
  lines,
  height = 500,
  width = '100%',
  xAxisKey,
  yAxisTicks = [0, 10, 20, 30, 40, 60, 80],
  yAxisTickFormatter = (val: any) => `${val}k`,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useTheme();
  const axisColor = theme.palette.customColors?.colorB2535F || '#444444';
  const gridColor = theme.palette.grey[600] || '#333333';
  const tickColor = theme.palette.secondary.dark || '#8B8B8B';

  if (!mounted) return <div style={{ height, width }} />;

  return (
    <DynamicMultiLineChartWrapper style={{ height, width }} className={className}>
      <Box className="chart-legend">
        {lines.map((line: any, index: any) => (
          <Box className="legend-item" key={index}>
            <Box className="legend-color" style={{ backgroundColor: line.color }} />
            <Typography variant="caption">{line.label}</Typography>
          </Box>
        ))}
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <marker
              id="arrowhead-right"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={axisColor} />
            </marker>
            <marker
              id="arrowhead-up"
              markerWidth="10"
              markerHeight="7"
              refX="1"
              refY="3.5"
              orient="auto-start-reverse"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={axisColor} />
            </marker>
          </defs>
          <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="4 4" />
          <XAxis
            dataKey={xAxisKey}
            axisLine={{ stroke: axisColor, markerEnd: 'url(#arrowhead-right)' }}
            tickLine={false}
            tick={{ fill: tickColor, fontSize: 13, dy: 10 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={{ stroke: axisColor, markerStart: 'url(#arrowhead-up)' }}
            tickLine={false}
            tick={{ fill: tickColor, fontSize: 13, dx: -10 }}
            ticks={yAxisTicks}
            tickFormatter={yAxisTickFormatter}
            domain={[0, 90]}
            allowDataOverflow={true}
          />
          <Tooltip
            content={<CustomTooltip lines={lines} />}
            cursor={{
              stroke: tickColor,
              strokeWidth: 1,
              strokeDasharray: '4 4',
            }}
          />
          {lines.map((line: any, index: any) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: line.color }}
              isAnimationActive={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </DynamicMultiLineChartWrapper>
  );
};

export default DynamicMultiLineChart;
