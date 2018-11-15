import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';

import { configureStore } from '../src/redux/store';

addDecorator(story => (
  <MemoryRouter>
    <Route path="/" component={story} />
  </MemoryRouter>
));
require('./extra-config')();

addDecorator(story => {
  const { store } = configureStore({});

  return <Provider store={store}>{story()}</Provider>;
});

setDefaults({
  maxPropStringLength: 8
});

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
