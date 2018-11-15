import React from 'react';
import T from 'prop-types';
import { Provider as StateProvider } from 'react-redux';
import ThemeProvider from '#/theme/ThemeProvider';
import AppShell from './AppShell';

const App = ({ store, content }) => {
  return (
    <StateProvider store={store}>
      <ThemeProvider>
        <AppShell>{content}</AppShell>
      </ThemeProvider>
    </StateProvider>
  );
};

App.contextTypes = {
  router: T.object
};

App.propTypes = {
  store: T.object,
  content: T.any
};

export default App;
