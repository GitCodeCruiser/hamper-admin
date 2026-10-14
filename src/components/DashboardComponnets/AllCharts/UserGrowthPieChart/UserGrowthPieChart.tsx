'use client';

import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

interface IPieDataItem {
  name: string;
  value: number;
  color: string;
}

const pieData: IPieDataItem[] = [
  { name: 'New Users', value: 33, color: '#0078D7' },
  { name: 'Returning Users', value: 67, color: '#F7630C' },
];

const UserGrowthPieChart = () => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setIsMounted(true);
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Donut geometry centrally located
  const cx = containerSize.w / 2;
  const cy = containerSize.h * 0.55;
  const outerR = Math.min(containerSize.w * 0.28, containerSize.h * 0.32);
  const innerR = outerR * 0.4; // thick donut

  // Top curve location anchoring
  const yOffset = outerR * 0.55; // Attaches directly to the top left/right curve
  const edgeWidth = Math.sqrt(Math.max(0, outerR * outerR - yOffset * yOffset));

  // Left connector line
  const ly1 = cy - yOffset;
  // Penetrates exactly slightly inside the colored edge avoiding the hole transparency
  const lx1 = cx - edgeWidth + 10;
  // Draws outward directly and sharply left
  const lx2 = cx - outerR - 25;
  const ly2 = ly1;
  // Pushes perfectly diagonally underneath the exact "0" character in "530" width area
  const lx3 = 80;
  const ly3 = 100;

  // Right connector line
  const ry1 = cy - yOffset;
  const rx1 = cx + edgeWidth - 10;
  const rx2 = cx + outerR + 25;
  const ry2 = ry1;
  // Pushes perfectly under the exact right bounding 0 in "3,980" in the absolute aligned box
  // The right text box anchors to `right: 32`. "Returning users" sets 114px width approx.
  // 3,980 touches the far left of its individual box stack block
  const rx3 = containerSize.w - 110;
  const ry3 = 100;

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        position: 'relative',
      }}
      className="chartBox"
    >
      {/* Top-left stat */}
      <Box sx={{ position: 'absolute', top: 32, left: 32, zIndex: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.customColors?.light || '#aaa',
            mb: 0.5,
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          New Users
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="h3"
            sx={{ color: theme.palette.common.white, fontWeight: 'bold', lineHeight: 1 }}
          >
            530
          </Typography>
          <Stack direction="row" spacing={0.3} alignItems="center">
            <Typography sx={{ color: theme.palette.error.main, fontSize: '10px', lineHeight: 1 }}>
              ▼
            </Typography>
            <Typography sx={{ color: theme.palette.error.main, fontSize: '13px', fontWeight: 500 }}>
              -12.5%
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Top-right stat */}
      <Box sx={{ position: 'absolute', top: 32, right: 32, zIndex: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.customColors?.light || '#aaa',
            mb: 0.5,
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Returning Users
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="h3"
            sx={{ color: theme.palette.common.white, fontWeight: 'bold', lineHeight: 1 }}
          >
            3,980
          </Typography>
          <Stack direction="row" spacing={0.3} alignItems="center">
            <Typography
              sx={{
                color: theme.palette.customColors?.colorB2535F || '#30B935',
                fontSize: '10px',
                lineHeight: 1,
              }}
            >
              ▲
            </Typography>
            <Typography
              sx={{
                color: theme.palette.customColors?.colorB2535F || '#30B935',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              +4.1%
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* SVG overlay zIndex:1 perfectly situated beneath pie natively drawing outwards */}
      {isMounted && containerSize.w > 0 && (
        <svg
          width={containerSize.w}
          height={containerSize.h}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
        >
          <defs>
            <marker id="arrowLeft" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#ffffff" />
            </marker>
            <marker
              id="arrowRight"
              markerWidth="6"
              markerHeight="6"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#ffffff" />
            </marker>
          </defs>

          {/* Left connector natively targeting text value middle point correctly upward 
              No gaps because starting explicitly inside edge mapping */}
          <polyline
            points={`${lx1},${ly1} ${lx2},${ly2} ${lx3},${ly3}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth={1}
            markerEnd="url(#arrowLeft)"
          />
          {/* Right connector targeting 0 under exact left-aligned metrics text */}
          <polyline
            points={`${rx1},${ry1} ${rx2},${ry2} ${rx3},${ry3}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth={1}
            markerEnd="url(#arrowRight)"
          />
        </svg>
      )}

      {/* Donut chart layout sitting cleanly over drawing mapping limits */}
      {isMounted && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pt: '48px',
            zIndex: 2, // Sits above horizontal svg anchors
          }}
        >
          <PieChart width={outerR * 2 + 50} height={outerR * 2 + 50}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={innerR}
              outerRadius={outerR}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              stroke="none"
              isAnimationActive={true}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#151515"
                  strokeWidth={14} // Mimics explicit parallel thick straight line visual spacing!
                />
              ))}
            </Pie>
          </PieChart>
        </Box>
      )}
    </Box>
  );
};

export default UserGrowthPieChart;
