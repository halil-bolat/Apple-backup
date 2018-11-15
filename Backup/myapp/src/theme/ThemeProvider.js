import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    {children}
  </MuiThemeProvider>
);

export default ThemeProvider;
