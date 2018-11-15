import React, { Component } from 'react';
import { Page, FocusDiv, FocusGrid, SampleGridItem } from 'vdkweb-tv-ui';
import theme from '#/views/views.scss';
import ds from './tvDatasource';

const btnClick = evt => {
  // a common btn Click handler. You can custom it in Grid Item class
  // to return the response, i.e. evt
  console.debug('From btnClick', evt);
};

const PAGE_NAV_ID = 'gridPage';
const COMMON_NAV = {
  id: 'grid',
  parent: PAGE_NAV_ID,
  useLastFocus: true
};

const urlToComponentMap = {
  movies: () => <FocusDiv nav={COMMON_NAV}>Movies</FocusDiv>,
  tvshows: () => <FocusDiv nav={COMMON_NAV}>TV Shows</FocusDiv>
};

class GridPage extends Component {
  getPageContent() {
    const alignment = Object.values(FocusGrid.ALIGNMENT)[1];
    const url = this.props.location.pathname.replace(/^\//, '');
    const Comp = urlToComponentMap[url];

    if (Comp) {
      return <Comp />;
    }

    return (
      <FocusGrid
        ref={c => {
          this._grid = c;
        }}
        alignment={alignment}
        col={10}
        row={3}
        itemWidth={180}
        itemHeight={180}
        preFetch={5}
        ds={ds}
        displayObject={<SampleGridItem onClick={btnClick} />}
        nav={COMMON_NAV}
      />
    );
  }

  render() {
    return (
      <Page
        className={theme.pageContent}
        nav={{
          id: PAGE_NAV_ID,
          nextdown: 'footermenu',
          nextup: 'TVVikimapMenu',
          useLastFocus: true,
          forwardFocus: 'grid'
        }}
      >
        <p>Home</p>
      </Page>
    );
  }
}

export default GridPage;
