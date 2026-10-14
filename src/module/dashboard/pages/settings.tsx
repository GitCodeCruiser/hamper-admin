'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { Suspense, useState } from 'react';

import MenuFooterSettingsForm from '../components/MenuFooterSettingsForm';
import WebsiteSettingsForm from '../components/WebsiteSettingsForm';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import PageLoader from '@/@core/components/others/PageLoader';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';

export default function DashboardWebsiteSettings() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <DashboardHome>
      <ErrorBoundary>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="settings tabs"
              textColor="inherit"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#D4AF37',
                },
                '& .MuiTab-root': {
                  color: '#6B0F1A',
                  opacity: 0.8,
                  '&.Mui-selected': {
                    color: '#D4AF37',
                    opacity: 1,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <Tab label="Website Settings" />
              <Tab label="Menu & Footer Links" />
            </Tabs>
          </Box>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            {tabValue === 0 && <WebsiteSettingsForm />}
            {tabValue === 1 && <MenuFooterSettingsForm />}
          </Suspense>
        </Box>
      </ErrorBoundary>
    </DashboardHome>
  );
}
