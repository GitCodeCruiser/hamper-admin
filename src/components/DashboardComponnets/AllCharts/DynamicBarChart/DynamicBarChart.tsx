'use client';
import { useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { DynamicBarChartWrapper } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardComponentStyled/DynamicBarChartStyled';

interface ITooltipPayload {
  color: string;
  dataKey: string;
  value: number;
}

interface ICustomTooltipProps {
  active?: boolean;
  payload?: ITooltipPayload[];
  label?: string;
}

const CustomTooltip: React.FC<ICustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-date">{label}</p>
        {(payload as ITooltipPayload[]).map((item: ITooltipPayload, index: number) => (
          <div className="tooltip-item" key={index}>
            <div className="tooltip-label">
              <div className="tooltip-color" style={{ backgroundColor: item.color }} />
              <span>Value :</span>
            </div>
            <span className="tooltip-value">{item.value?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const DynamicBarChart: React.FC<any & { className?: string }> = ({
  data,
  barKey,
  xAxisKey,
  height = 500,
  width = '100%',
  yAxisTicks = [0, 100, 200, 300, 400, 500, 600, 700],
  yAxisTickFormatter = (val: any) => (val === 0 ? '00' : val.toString()),
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useTheme();
  const axisColor = theme.palette.customColors?.colorC3B876 || '#444444';
  const gridColor = theme.palette.grey[600] || '#333333';
  const tickColor = theme.palette.secondary.dark || '#8B8B8B';

  const gradientId = 'barGradient';

  if (!mounted) return <div style={{ height, width }} />;

  return (
    <DynamicBarChartWrapper style={{ height, width }} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4B87EB" stopOpacity={1} />
              <stop offset="100%" stopColor="#193D87" stopOpacity={1} />
            </linearGradient>
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
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            axisLine={{ stroke: axisColor, markerStart: 'url(#arrowhead-up)' }}
            tickLine={false}
            tick={{ fill: tickColor, fontSize: 13, dx: -10 }}
            ticks={yAxisTicks}
            tickFormatter={yAxisTickFormatter}
            domain={[0, 800]}
            allowDataOverflow={true}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
          <Bar dataKey={barKey} fill={`url(#${gradientId})`} radius={[4, 4, 0, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </DynamicBarChartWrapper>
  );
};

export default DynamicBarChart;
