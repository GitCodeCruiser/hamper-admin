import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { borderRadius } from '@/mui-theme/themeConstant';

interface MuiModalWrapperProps {
  open: boolean;
  onClose?: () => void;
  scroll?: 'paper' | 'body';
  children: React.JSX.Element | React.JSX.Element[];
  title?: string;
  isAutoClose?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  disableEnforceFocus?: boolean;
  disablePortal?: boolean;
}

export default function MuiModalWrapper({
  open,
  onClose,
  scroll,
  children,
  title,
  isAutoClose = false,
  maxWidth = 'sm',
  fullWidth = false,
  disableEnforceFocus = true,
  disablePortal = false,
}: MuiModalWrapperProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={isAutoClose ? onClose : () => {}}
      scroll={scroll}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      disableEnforceFocus={disableEnforceFocus}
      disableAutoFocus={true}
      disableRestoreFocus={true}
      disablePortal={disablePortal}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        style: {
          borderRadius,
        },
      }}
    >
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography>{title}</Typography>
          <IconButton onClick={onClose} autoFocus>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
