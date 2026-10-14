'use client';

import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useState } from 'react';

import CMSRoutePageMain from '@/module/dashboard/pages/cms/route';
import RouteListDeletedMain from '@/module/dashboard/pages/route/deleted-list';
import RouteListMain from '@/module/dashboard/pages/route/list';

export default function Page() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <CMSRoutePageMain />

      <Box sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          <Tab
            label="Routes"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '16px',
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
          <Tab
            label="Deleted Routes"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '16px',
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </Tabs>
      </Box>

      {activeTab === 0 ? <RouteListMain /> : <RouteListDeletedMain />}
    </>
  );
}
