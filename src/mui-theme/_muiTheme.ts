import { PaletteMode } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';

import { palette } from './_palette';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';

/**
 * The function `MuiThemeOptions` returns a configuration object for the Material-UI theme based on the
 * provided mode (light or dark) and includes customizations for various components and typography.
 * @param {PaletteMode} mode - The `mode` parameter is of type `PaletteMode` and is used to determine
 * the color palette mode for the theme. The `PaletteMode` type can have two possible values: "light"
 * or "dark".
 * @returns The function `MuiThemeOptions` returns a `ThemeOptions` object.
 */

export const cormorant = {
  style: {
    fontFamily: 'var(--font-cormorant), serif',
  },
};

export const fraunces = {
  style: {
    fontFamily: 'var(--font-fraunces), serif',
  },
};

export const bricolageGrotesque = {
  style: {
    fontFamily: 'var(--font-bricolage_grotesque), sans-serif',
  },
};

export const MuiThemeOptions = (mode: PaletteMode): ThemeOptions => {
  const headingStyles = {
    h1: {
      fontSize: `${CustomSize(32)}`,
      lineHeight: '1.1em',
      fontWeight: '400',
      fontFamily: cormorant.style.fontFamily,
      letterSpacing: `${CustomSize(-1.5)}`,
    },

    h2: {
      fontSize: `${CustomSize(20)}`,
      lineHeight: '1.1em',
      fontWeight: '500',
      fontFamily: cormorant.style.fontFamily,
      letterSpacing: `${CustomSize(-1.5)}`,
    },
    h3: {
      fontSize: `${CustomSize(18)}`,
      lineHeight: '1.1em',
      fontWeight: '400',
      fontFamily: cormorant.style.fontFamily,
      letterSpacing: `${CustomSize(-1.5)}`,
    },
    h4: {
      fontSize: `${CustomSize(27)}`,
      lineHeight: '1.3',
      fontWeight: '400',
      fontFamily: cormorant.style.fontFamily,
      letterSpacing: `${CustomSize(-1.5)}`,
    },
    h5: {
      fontSize: `${CustomSize(16)}`,
      lineHeight: '1.4',
      fontWeight: '400',
      fontFamily: cormorant.style.fontFamily,
      letterSpacing: `${CustomSize(-1.5)}`,
    },
    h6: {
      fontSize: `${CustomSize(14)}`,
      lineHeight: '1.5',
      fontWeight: '400',
      fontFamily: cormorant.style.fontFamily,
      letterSpacing: `${CustomSize(-1.5)}`,
    },
  };
  return {
    palette: palette(mode),
    typography: {
      fontFamily: '"Google Sans", sans-serif',
      ...headingStyles,

      body1: {
        fontSize: `${CustomSize(14)}`,
        lineHeight: '1.5em',
        fontWeight: '400',
      },
      body2: {
        fontSize: `${CustomSize(12)}`,
        lineHeight: '1.5em',
        fontWeight: '400',
      },
      caption: {
        fontSize: `${CustomSize(14)}`,
        lineHeight: '1.5em',
        fontWeight: '400',
      },
    },
    shadows: [
      'none',
      '0px 2px 4px 0px rgba(47, 43, 61, 0.12)',
      '0px 2px 6px 0px rgba(47, 43, 61, 0.14)',
      '0px 3px 8px 0px rgba(47, 43, 61, 0.14)',
      '0px 3px 9px 0px rgba(47, 43, 61, 0.15)',
      '0px 4px 10px 0px rgba(47, 43, 61, 0.15)',
      '0px 4px 11px 0px rgba(47, 43, 61, 0.16)',
      '0px 4px 18px 0px rgba(47, 43, 61, 0.1)',
      '0px 4px 13px 0px rgba(47, 43, 61, 0.18)',
      '0px 5px 14px 0px rgba(47, 43, 61, 0.18)',
      '0px 5px 15px 0px rgba(47, 43, 61, 0.2)',
      '0px 5px 16px 0px rgba(47, 43, 61, 0.2)',
      '0px 6px 17px 0px rgba(47, 43, 61, 0.22)',
      '0px 6px 18px 0px rgba(47, 43, 61, 0.22)',
      '0px 6px 19px 0px rgba(47, 43, 61, 0.24)',
      '0px 7px 20px 0px rgba(47, 43, 61, 0.24)',
      '0px 7px 21px 0px rgba(47, 43, 61, 0.26)',
      '0px 7px 22px 0px rgba(47, 43, 61, 0.26)',
      '0px 8px 23px 0px rgba(47, 43, 61, 0.28)',
      '0px 8px 24px 6px rgba(47, 43, 61, 0.28)',
      '0px 9px 25px 0px rgba(47, 43, 61, 0.3)',
      '0px 9px 26px 0px rgba(47, 43, 61, 0.32)',
      '0px 9px 27px 0px rgba(47, 43, 61, 0.32)',
      '0px 10px 28px 0px rgba(47, 43, 61, 0.34)',
      '0px 10px 30px 0px rgba(47, 43, 61, 0.34)',
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '.h1': {
            '&&': {
              ...headingStyles.h1,
            },
          },
          '.h2': {
            '&&': {
              ...headingStyles.h2,
            },
          },
          '.h3': {
            '&&': {
              ...headingStyles.h3,
            },
          },
          '.h4': {
            '&&': {
              ...headingStyles.h4,
            },
          },
          '.h5': {
            '&&': {
              ...headingStyles.h5,
            },
          },
          '.h6': {
            '&&': {
              ...headingStyles.h6,
            },
          },
        },
      },
      MuiSkeleton: {
        defaultProps: {
          animation: 'wave',
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ _ownerState, theme }) => {
            return {
              borderRadius: `${CustomSize(8)}`,
              boxShadow: `0px 4px 24px 0px ${theme.palette.background.paper}`,
            };
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: () => {
            return {
              '@media(max-width:899px)': {
                minHeight: '20px',
              },
            };
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ _theme }) => {
            return {
              overflow: 'visible !important',
              filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
              marginTop: `${CustomSize(6)}`,

              '@media(max-width:899px)': {
                marginTop: '0',
              },
            };
          },
          list: () => {
            return {
              paddingTop: `${CustomSize(4)}`,
              paddingBottom: `${CustomSize(4)}`,
            };
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            return {
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: `${CustomSize(12)}`,
              padding: `${CustomSpacing(15, 24)}`,
              lineHeight: '1.5',
              letterSpacing: '0.08em',
              borderRadius: '0',

              '& .MuiButton-startIcon': {
                marginLeft: 0,
              },

              '& .MuiButton-endIcon': {
                marginRight: 0,
              },

              ...(ownerState.variant === 'contained' &&
                ownerState.color === 'secondary' && {
                background: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.secondary.main}`,

                '&:hover': {
                  background: theme.palette.primary.main,
                  color: `${theme.palette.secondary.main}`,
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }),

              ...(ownerState.variant === 'outlined' &&
                ownerState.color === 'secondary' && {
                background: 'transparent',
                color: theme.palette.secondary.main,
                border: `1px solid ${theme.palette.secondary.main}`,

                '&:hover': {
                  background: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                },
              }),

              ...(ownerState.variant === 'outlined' &&
                ownerState.color === 'primary' && {
                background: 'transparent',
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}`,

                '&:hover': {
                  background: theme.palette.secondary.main,
                  color: `${theme.palette.primary.main}`,
                  border: `1px solid ${theme.palette.secondary.main}`,
                },
              }),
            };
          },
        },
        defaultProps: {
          disableElevation: true,
          disableRipple: true,
          disableFocusRipple: true,
        },
      },

      MuiBackdrop: {
        styleOverrides: {
          root: {
            // backdropFilter: "blur(4px)"
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: ({ theme }) => ({
            backgroundColor: theme?.palette?.primary.main,
          }),
        },
      },
    },
  };
};
