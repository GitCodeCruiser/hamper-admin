// ** MUI Imports
import { Theme } from '@mui/material/styles';

const GlobalStyling = (_theme: Theme) => ({
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
  a: {
    display: 'inline-block',
    textDecoration: 'none',
  },

  'p:last-child': {
    marginBottom: 0,
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },

  // Additional styles here
});

export default GlobalStyling;
