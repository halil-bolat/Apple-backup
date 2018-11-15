import React from 'react';
import { withForwardFocus } from 'vdkweb-navigation';
import {
  FocusDiv,
  FocusButton,
  FocusGrid,
  SampleGridItem,
  sampleDatasource as ds,
  FocusHeroBanner,
  SampleCarouselItem
} from 'vdkweb-tv-ui';

import theme from '#/views/views.scss';
import tvShows from '#/services/ovp/data/tvshow';

// import LayoutX from '../../ui/LayoutX';

// <Grid col={10} row={2} itemWidth={180} itemHeight={180} ds={ds} Item={SampleGridItem} nav={{ id: 'qqq', useLastFocus: true, nextdown: 'aaa' }}/>

// const layout1 = `item1 item2 item3
//                  item4 item5 item6
//                  item7 item8 item9`;

// const layout2 = `item1 item2 item3
//                  ..... item5 .
//                  item7 .     item9`;

// const layout3 = `item1 item1 item3
//                  item4 item5 item6
//                  item7 item8 item6`;

// const layout4 = `item1 item1 item2 item3
//                  item1 item1 item4 item3
//                  item5 item6 item7 item7
//                  item8 item9 item7 item7`;

//    <LayoutX nav={{ id: 'layoutx', nextdown: 'aaa', forwardFocus: 'item1'}} layout={layout2}>
//      <FocusButton children='item1' nav={{id:'item1'}} />
//      <FocusButton children='item2' nav={{id:'item2'}} />
//      <FocusButton children='item3' nav={{id:'item3'}} />
//      <FocusButton children='item4' nav={{id:'item4'}} />
//      <FocusButton children='item5' nav={{id:'item5'}} />
//      <FocusButton children='item6' nav={{id:'item6'}} />
//      <FocusButton children='item7' nav={{id:'item7'}} />
//      <FocusButton children='item8' nav={{id:'item8'}} />
//      <FocusButton children='item9' nav={{id:'item9'}} />
//    </LayoutX>

const data = [...tvShows.entries].slice(0, 10);

const btnClick = (...e) => {
  console.log('from btnClick');
  console.log(...e);
};

const heroBannerSize = {
  width: 1500,
  height: 700
};

const TVTest = () => (
  <div className={theme.pageContent}>
    <FocusGrid
      col={10}
      row={2}
      itemWidth={180}
      itemHeight={180}
      ds={ds}
      displayObject={<SampleGridItem />}
      nav={{ id: 'qqq', useLastFocus: true, nextdown: 'xxList' }}
    />

    <FocusHeroBanner
      items={data}
      keyProperty="id"
      col={1}
      style={{
        position: 'relative',
        width: `${heroBannerSize.width}px`,
        height: `${heroBannerSize.height}px`
      }}
      nav={{ id: 'xxList', nextdown: 'aaa', nextup: 'qqq' }}
      displayObject={
        <SampleCarouselItem
          onClick={btnClick}
          width={heroBannerSize.width}
          height={heroBannerSize.height}
        />
      }
    />

    <div style={{ float: 'left' }}>
      (div)
      <FocusButton
        children="aaa"
        nav={{
          id: 'aaa',
          nextup: 'xxList',
          nextdown: 'bbb',
          nextright: 'eee',
          nextleft: 'FocusButtonx'
        }}
        onClick={() => console.log('aaa')}
      />
      <FocusButton
        children="bbb"
        nav={{
          id: 'bbb',
          nextup: 'aaa',
          nextdown: 'ccc',
          nextright: 'fff',
          nextleft: 'FocusButtonx'
        }}
        onClick={() => console.log('bbb')}
      />
      <FocusButton
        children="ccc"
        nav={{
          id: 'ccc',
          nextup: 'bbb',
          nextdown: 'ddd',
          nextright: 'ggg',
          nextleft: 'FocusButtonx'
        }}
        onClick={() => console.log('ccc')}
      />
      <FocusButton
        children="ddd"
        nav={{
          id: 'ddd',
          nextup: 'ccc',
          nextdown: '',
          nextright: 'ggg',
          nextleft: 'FocusButtonx'
        }}
        onClick={() => console.log('ddd')}
      />
    </div>

    <div style={{ float: 'left' }}>
      (div)
      <FocusButton
        children="eee"
        nav={{
          id: 'eee',
          nextup: 'ggg',
          nextdown: 'fff',
          nextleft: 'aaa',
          nextright: 'hhh'
        }}
        onClick={() => console.log('eee')}
      />
      <FocusButton
        children="fff"
        nav={{
          id: 'fff',
          nextup: 'eee',
          nextdown: 'ggg',
          nextleft: 'bbb',
          nextright: 'iii'
        }}
        onClick={() => console.log('fff')}
      />
      <FocusButton
        children="ggg"
        nav={{
          id: 'ggg',
          nextup: 'fff',
          nextdown: 'eee',
          nextleft: 'ccc',
          nextright: 'jjj'
        }}
        onClick={() => console.log('ggg')}
      />
    </div>

    <FocusDiv
      style={{ float: 'left' }}
      nav={{
        id: 'FocusButtonx',
        forwardFocus: 'hhh',
        nextright: 'kkk',
        useLastFocus: true
      }}
    >
      (FocusDiv)
      <FocusButton
        children="hhh"
        nav={{
          id: 'hhh',
          nextup: 'jjj',
          nextdown: 'iii',
          nextleft: 'eee',
          parent: 'FocusButtonx'
        }}
        onClick={() => console.log('hhh')}
      />
      <FocusButton
        children="iii"
        nav={{
          id: 'iii',
          nextup: 'hhh',
          nextdown: 'jjj',
          nextleft: 'fff',
          parent: 'FocusButtonx'
        }}
        onClick={() => console.log('iii')}
      />
      <FocusButton
        children="jjj"
        nav={{
          id: 'jjj',
          nextup: 'iii',
          nextdown: 'hhh',
          nextleft: 'ggg',
          parent: 'FocusButtonx'
        }}
        onClick={() => console.log('jjj')}
      />
    </FocusDiv>

    <FocusDiv
      style={{ float: 'left' }}
      nav={{
        id: 'x1',
        forwardFocus: 'x2',
        nextright: 'FocusButtonx2',
        nextleft: 'FocusButtonx'
      }}
    >
      (FocusDiv)
      <FocusDiv nav={{ id: 'x2', forwardFocus: 'kkk', parent: 'x1' }}>
        <FocusButton
          children="kkk"
          nav={{ id: 'kkk', parent: 'x2' }}
          onClick={() => console.log('kkk')}
        />
      </FocusDiv>
    </FocusDiv>

    <FocusDiv
      style={{ float: 'left' }}
      nav={{
        id: 'FocusButtonx2',
        forwardFocus: 'lll',
        nextleft: 'kkk',
        nextright: 'aaa',
        useLastFocus: true
      }}
    >
      (FocusDiv)
      <FocusButton
        children="lll"
        nav={{ id: 'lll', parent: 'FocusButtonx2' }}
        onClick={() => console.log('hhh')}
      />
    </FocusDiv>
  </div>
);

// export default TVTest;

// if the view needs a forward focus.
export default withForwardFocus({
  Component: TVTest,
  // forwardFocus: 'ccc'
  forwardFocus: 'qqq'
});
