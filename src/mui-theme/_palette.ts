// ** Type Imports

// import { Palette } from '@mui/material';
import { Palette } from '@mui/material';

export const palette = (mode: Palette['mode']): Palette => {
  // ** Vars
  const whiteColor = '#FFFFFF';
  const lightColor = '#2F2B3D'; // Hex equivalent of '47, 43, 61'
  const darkColor = '#10212B'; // Hex equivalent of '208, 212, 241'
  const darkPaperBgColor = '#2F3349';
  const mainColor = mode === 'light' ? darkColor : darkColor;
  const defaultBgColor = whiteColor;

  // Convert RGBA to Hex with opacity
  const hexWithOpacity = (hex: string, opacity: number) => {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0');

    return `${hex}${alpha}`;
  };

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F1F0F2' : '#363B54',
      avatarBg: mode === 'light' ? '#DBDADE' : '#4A5072',
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072',
      placeText: '#576E6E',
      colorFFFFF0: '#FFFFF0',
      white10: hexWithOpacity(whiteColor, 0.1),
      white70: hexWithOpacity(whiteColor, 0.7),
      colorB2535F: '#B2535F',
      colorFFFDEF: '#FFFDEF',
      colorFFFBE1: '#FFFBE1',
      colorFFFCED: '#FFFCED',
      colorFFFDF1: '#FFFDF1',
      colorF0EAC5: '#F0EAC5',
      colorF3EDCD: '#F3EDCD',
      colorC3B876: '#C3B876',
      colorF8F4DC: '#F8F4DC',
      colorE8DFB0: '#E8DFB0',
      colorFFEFBD: '#FFEFBD',
      colorD2F798: '#D2F798',
      colorF2EDCF: '#F2EDCF',
      textColor: '#6B0F1A',
    },
    mode,
    common: {
      black: '#000000',
      white: whiteColor,
    },
    primary: {
      light: '#B2B4B8',
      main: '#D4AF37',
      dark: '#E0B125',
      contrastText: whiteColor,
    },
    secondary: {
      light: '#B2B4B8',
      main: '#D4AF37',
      dark: '#E0B125',
      contrastText: whiteColor,
    },
    error: {
      light: '#ED6F70',
      main: '#EA5455',
      dark: '#CE4A4B',
      contrastText: whiteColor,
    },
    warning: {
      light: '#FFAB5A',
      main: '#FF9F43',
      dark: '#E08C3B',
      contrastText: whiteColor,
    },
    info: {
      light: '#1FD5EB',
      main: '#00CFE8',
      dark: '#00B6CC',
      contrastText: whiteColor,
    },
    success: {
      light: '#42CE80',
      main: '#28C76F',
      dark: '#23AF62',
      contrastText: whiteColor,
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161',
    },
    text: {
      primary: mainColor,
      secondary: darkColor,
      disabled: hexWithOpacity(mainColor, 0.42),
    },
    divider: hexWithOpacity(mainColor, 0.16),
    background: {
      paper: mode === 'light' ? whiteColor : darkPaperBgColor,
      default: defaultBgColor,
    },
    action: {
      active: hexWithOpacity(mainColor, 0.54),
      hover: hexWithOpacity(mainColor, 0.04),
      selected: hexWithOpacity(mainColor, 0.06),
      selectedOpacity: 0.06,
      disabled: hexWithOpacity(mainColor, 0.26),
      disabledBackground: hexWithOpacity(mainColor, 0.12),
      focus: hexWithOpacity(mainColor, 0.12),
    },
  } as Palette;
};
