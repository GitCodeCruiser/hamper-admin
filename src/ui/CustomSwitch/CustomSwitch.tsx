import styled from '@emotion/styled';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))({
  width: 44,
  height: 24,
  padding: 0,
  borderRadius: 50,
  '& + .MuiFormControlLabel-label': {
    fontSize: 16,
    fontWeight: 500,
    color: '#fff',
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        border: 0,
        backgroundColor: '#DC2B31',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      border: '6px solid #fff',
    },
  },

  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#151515',
    opacity: 1,

    // transition: theme.transitions.create(['background-color'], {
    //   duration: 500,
    // }),
  },
});

interface props extends SwitchProps {
  label?: string;
}

export default function CustomSwitch({ label, ...others }: props) {
  return <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} {...others} />} label={label} />;
}
