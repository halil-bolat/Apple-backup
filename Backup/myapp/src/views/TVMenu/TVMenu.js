import React from 'react';
import { FocusMenu, Page } from 'vdkweb-tv-ui';
import styles from './tvMenu.scss';

const BUTTON_TWO = [
  {
    displayText: 'Menu Button 1',
    subItem: [{ displayText: 'Root', to: '/' }]
  },
  {
    displayText: 'Menu Button 2',
    subItem: [
      { displayText: 'TV Carousel', to: '/tv-carousel' },
      { displayText: 'TV Hero Banner', to: '/tv-hero-banner' }
    ]
  },
  {
    displayText: 'Menu Button 3',
    subItem: [
      { displayText: 'TV Keyboard', to: '/tv-keyboard' },
      { displayText: 'TV Popup', to: '/tv-popup' },
      { displayText: 'TV Grid', to: '/tv-grid' }
    ]
  },
  {
    displayText: 'Menu Button 4',
    subItem: [
      { displayText: 'TV Player', to: '/tv-player' },
      { displayText: 'TV Menu - Focus Only', to: '/tv-menu-focus' },
      { displayText: 'TV Menu - Clickable', to: '/tv-menu-clickable' },
      { displayText: 'TV Page Test', to: '/tv-page' }
    ]
  },
  {
    displayText: 'Menu Button 5',
    subItem: [
      { displayText: 'Sub Menu Button 1' },
      { displayText: 'Sub Menu Button 2' },
      { displayText: 'Sub Menu Button 3' },
      { displayText: 'Sub Menu Button 4' },
      { displayText: 'Sub Menu Button 5' }
    ]
  }
];

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

const PAGE_NAV_ID = 'menuPage';

const TVMenuTest = ({ theme = styles }) => (
  <Page
    nav={{
      id: PAGE_NAV_ID,
      nextdown: 'footermenu',
      nextup: 'TVVikimapMenu',
      useLastFocus: true,
      forwardFocus: 'sampleMenu'
    }}
  >
    <FocusMenu
      className={theme.mainMenuNav}
      items={BUTTON_TWO}
      directionMapping={BUTTON_OPTIONS}
      theme={theme}
      nav={{
        id: 'sampleMenu',
        parent: PAGE_NAV_ID,
        useLastFocus: true
      }}
    />
  </Page>
);

export default TVMenuTest;
