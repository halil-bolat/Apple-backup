import React from 'react';
import { Redirect } from 'react-router-dom';

import TVViewContainer from '#/views/TVViewContainer/TVViewContainer';

import {
  GridPage,
  TVGrid,
  NoMatch
} from '#/views';

const routes = [
  {
    component: TVViewContainer,
    routes: [
      {
        path: '/',
        exact: true,
        component: () => <Redirect to="/GridPage" />
      },
      {
        path: '/Home',
        component: TVGrid
      },
      {
        path: 'GridPage',
        component: GridPage
      },
      {
        path: 'Player_page',
        component: NoMatch
      }
    ]
  }
];

export default routes;
