import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

import CustomLoader from '../Loader/Loder';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';

const CustomButtonWrapper = styled(Button)<ButtonProps>(({ theme, color, variant }) => {
  const btnColor = color || 'primary';
  const btnVariant = variant || 'contained';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: `${CustomSize(12)}`,
    padding: `${CustomSpacing(15, 24)}`,
    lineHeight: '1.5',
    letterSpacing: '0.08em',
    borderRadius: '0',
    boxShadow: 'none',

    '&.Mui-disabled': {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.6,
    },
    '&:hover': {
      boxShadow: 'none',
    },

    ...(btnVariant === 'contained' &&
      btnColor === 'primary' && {
      background: theme.palette.primary.main,
      color: (theme.palette as any).customColors?.dark || '#10212B',
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        background: theme.palette.customColors.textColor,
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.customColors.textColor}`,
      },
    }),

    ...(btnVariant === 'contained' &&
      btnColor === 'secondary' && {
      background: theme.palette.secondary.main,
      color: theme.palette.customColors.textColor,
      border: `1px solid ${theme.palette.secondary.main}`,
      '&:hover': {
        background: theme.palette.customColors.textColor,
        color: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.primary.main}`,
      },
    }),

    ...(btnVariant === 'outlined' &&
      btnColor === 'primary' && {
      background: 'transparent',
      color: theme.palette.customColors.textColor,
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        background: theme.palette.secondary.main,
        color: theme.palette.customColors.textColor,
        border: `1px solid ${theme.palette.secondary.main}`,
      },
    }),

    ...(btnVariant === 'outlined' &&
      btnColor === 'secondary' && {
      background: 'transparent',
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      '&:hover': {
        background: theme.palette.secondary.main,
        color: theme.palette.customColors.textColor,
      },
    }),
  };
});

export interface CustomButtonProps extends Omit<ButtonProps, 'children' | 'loading'> {
  children: React.ReactNode;
  className?: string;
  loading?:
    | boolean
    | {
        delay?: number;
      };
}

const CustomButtonPrimary = ({
  children,
  className,
  loading = false,
  ...others
}: CustomButtonProps) => {
  return (
    <CustomButtonWrapper className={className || ''} disableElevation disableRipple {...others}>
      {loading && <CustomLoader size={15} />}
      {children}
    </CustomButtonWrapper>
  );
};

export default CustomButtonPrimary;
