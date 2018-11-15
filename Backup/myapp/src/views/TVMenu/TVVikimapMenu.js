import React from 'react';
import { Page } from 'vdkweb-tv-ui';
import withConfig from '#/containers/utils/withConfig';
import TVVikimapMenu from '#/tv/containers/Menu/TVVikimapMenu';
import menuTheme from './tvMenu.scss';

const PAGE_NAV_ID = 'wikimapMenuPage';

const BUTTON_OPTIONS = [
  {
    prev: 'nextleft',
    next: 'nextright',
    down: 'nextdown'
  },
  {
    prev: 'nextup',
    next: 'nextdown',
    up: 'nextup'
  }
];

const TVVikimapMenuPage = ({ config: { vikimap } = {}, theme = menuTheme }) => (
  <Page
    nav={{
      id: PAGE_NAV_ID,
      useLastFocus: true,
      forwardFocus: 'TVVikimapMenuView'
    }}
  >
    <TVVikimapMenu
      id={vikimap.mainMenuId}
      nav={{
        id: 'TVVikimapMenuView',
        internal: null,
        nextdown: 'footermenu',
        nextup: 'TVVikimapMenu'
      }}
      directionMapping={BUTTON_OPTIONS}
      theme={theme}
    />
  </Page>
);

export default withConfig(TVVikimapMenuPage);
