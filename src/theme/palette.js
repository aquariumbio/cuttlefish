import { colors } from '@material-ui/core';

const white = '#FFFFFF';

export default {
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: '#065683',
    light: '#7D9DB7'
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue.A700,
    light: colors.blue.A400
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F6F8',
    paper: white
  },
  divider: colors.grey[200],
  success: { main: colors.green[500] },
  caution: { main: colors.amber[500] },
  statusGrey: { main: '#C9C9C9' },
  statusGreen: { main: '#4CAF50' },
  statusYellow: { main: '#FFC164' },
  white: { main: '#FFFFFF', dark: '#F4F6F8' }
};
