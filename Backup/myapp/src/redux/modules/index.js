/*
 * Export the Redux modules that you would like to
 * use with state management.
 *
 * This will be used by redux/reducer.js to walkthrough
 * all registered modules and add root selectors to them for
 * providing the base state of each module.
 */

/* External modules */

import * as vikimap from 'vdkweb-vikimap/lib/redux';
import * as player from 'vdkweb-player/lib/redux';

/* TV modules */
import * as navigation from 'vdkweb-navigation';
import { pageRedux } from 'vdkweb-tv-ui';

/* Internal modules */

/* eslint-disable import/no-unresolved */

import * as config from './config';
import * as lifecycle from './lifecycle';
import * as menu from './menu';
import * as status from './status';
import * as vikimapQueries from './vikimapQueries';

/* eslint-enable import/no-unresolved */

export default {
  config,
  lifecycle,
  menu,
  status,
  vikimapQueries,
  vikimap,
  player,
  navigation,
  pageRedux
};
