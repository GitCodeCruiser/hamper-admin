'use client';

import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useState } from 'react';

import AirportListDeletedMain from '@/module/dashboard/pages/airport/deleted-list';
import AirportListMain from '@/module/dashboard/pages/airport/list';
import CMSAirportPageMain from '@/module/dashboard/pages/cms/airport';

export default function Page() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <CMSAirportPageMain />

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
            label="Airports"
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
            label="Deleted Airports"
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

      {activeTab === 0 ? <AirportListMain /> : <AirportListDeletedMain />}
    </>
  );
}
