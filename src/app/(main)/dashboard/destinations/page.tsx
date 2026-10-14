'use client';

import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useState } from 'react';

import CMSCityPageMain from '@/module/dashboard/pages/cms/city';
import CityListDeletedMain from '@/module/dashboard/pages/destinations/deleted-list';
import CityListMain from '@/module/dashboard/pages/destinations/list';

export default function Page() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <CMSCityPageMain />

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
            label="Destinations"
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
            label="Deleted Destinations"
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

      {activeTab === 0 ? <CityListMain /> : <CityListDeletedMain />}
    </>
  );
}
