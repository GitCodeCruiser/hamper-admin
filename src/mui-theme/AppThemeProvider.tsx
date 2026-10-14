'use client';

import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import * as React from 'react';

import { MuiThemeOptions } from './_muiTheme';
import GlobalStyling from './globalStyles';

// Mui theme set up provider for app directory

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const theme = createTheme(MuiThemeOptions('light'));

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme)} />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default AppThemeProvider;
