declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      dark: string;
      main: string;
      light: string;
      bodyBg: string;
      trackBg: string;
      avatarBg: string;
      darkPaperBg: string;
      lightPaperBg: string;
      tableHeaderBg: string;
      placeText: string;
      colorFFFFF0: string;
      white10: string;
      white70: string;
      colorB2535F: string;
      colorFFFDEF?: string;
      colorFFFBE1?: string;
      colorFFFCED: string;
      colorFFFDF1?: string;
      colorF0EAC5?: string;
      colorF3EDCD: string;
      colorC3B876: string;
      colorF8F4DC: string;
      colorE8DFB0: string;
      colorFFEFBD: string;
      colorD2F798: string;
      colorF2EDCF: string;
      textColor: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      dark?: string;
      main?: string;
      light?: string;
      bodyBg?: string;
      trackBg?: string;
      avatarBg?: string;
      darkPaperBg?: string;
      lightPaperBg?: string;
      tableHeaderBg?: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tonal: true;
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    tonal: true;
  }
}

export {};
