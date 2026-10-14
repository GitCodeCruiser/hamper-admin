'use client';

import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useState } from 'react';

import AirportDataListDeletedMain from '@/module/dashboard/pages/airport-data/deleted-list';
import AirportDataListMain from '@/module/dashboard/pages/airport-data/list';

export default function Page() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
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
            label="Airport Data"
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
            label="Deleted Airport Data"
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

      {activeTab === 0 ? <AirportDataListMain /> : <AirportDataListDeletedMain />}
    </>
  );
}
