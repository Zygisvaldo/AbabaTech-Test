import { createTheme } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: '#b388ff',
    },
  },
});

export default theme;
