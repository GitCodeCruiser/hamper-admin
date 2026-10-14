'use client';

import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useState } from 'react';

import AircraftListDeletedMain from '@/module/dashboard/pages/aircraft/main/deleted-list';
import AircraftListMain from '@/module/dashboard/pages/aircraft/main/list';
import CMSAircraftPageMain from '@/module/dashboard/pages/cms/aircraft';

export default function Page() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <CMSAircraftPageMain />

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
            label="Aircraft"
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
            label="Deleted Aircraft"
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

      {activeTab === 0 ? <AircraftListMain /> : <AircraftListDeletedMain />}
    </>
  );
}
