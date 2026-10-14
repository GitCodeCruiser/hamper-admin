'use client';
import { Box, styled } from '@mui/material';

export const DynamicBarChartWrapper = styled(Box)(({ theme }) => ({
  padding: '32px',
  backgroundColor: theme.palette.grey[50] || '#151515',
  borderRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',

  '.recharts-cartesian-grid-horizontal line': {
    stroke: theme.palette.grey[600] || '#333',
    strokeDasharray: '4 4',
  },

  '.recharts-xAxis .recharts-cartesian-axis-line': {
    stroke: theme.palette.customColors?.colorB2535F || '#444',
  },

  '.recharts-yAxis .recharts-cartesian-axis-line': {
    stroke: theme.palette.customColors?.colorB2535F || '#444',
  },

  '.recharts-cartesian-axis-tick-value': {
    fill: theme.palette.secondary.dark || '#888',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'inherit',
  },

  '.custom-tooltip': {
    background: theme.palette.customColors?.colorB2535F || '#1c1c1e',
    borderRadius: '12px',
    padding: '20px',
    border: `1px solid ${theme.palette.grey[600] || '#333'}`,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
    minWidth: '220px',
  },

  '.tooltip-date': {
    color: theme.palette.common.white,
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '16px',
    borderBottom: `1px solid ${theme.palette.grey[600] || '#333'}`,
    paddingBottom: '12px',
  },

  '.tooltip-item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
    '&:last-child': {
      marginBottom: 0,
    },
  },

  '.tooltip-label': {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: theme.palette.text.primary || '#a1a1aa',
    fontSize: '14px',
  },

  '.tooltip-color': {
    width: '14px',
    height: '14px',
    borderRadius: '4px',
  },

  '.tooltip-value': {
    color: theme.palette.common.white,
    fontSize: '14px',
    fontWeight: 600,
  },
}));
