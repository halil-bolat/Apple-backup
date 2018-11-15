import React, { Component } from 'react';
import { connect } from 'react-redux';
import { system } from 'xdk3';
import {
  FocusButton,
  FocusCarousel,
  Page,
  pageRedux,
  FocusPopup,
  SampleCarouselItem
} from 'vdkweb-tv-ui';

import { appHistory } from '#/config/history';
import theme from '#/views/views.scss';
import ovp from '#/services/ovp';

const { actions } = pageRedux;

const PAGE_NAV_ID = 'carouselPage';

// Define the props for different types of popup.
const POPUP_TYPES = {
  EXIT: {
    name: 'EXIT',
    title: 'Confirm Exit?',
    content: 'Do you want to exit?',
    action: () => {
      // If confirm action is chosen, custom exit action will be triggered.
      try {
        system.exit();
      } catch (e) {
        console.warn(e);
      }
    }
  },
  TO_MENU: {
    name: 'TO_MENU',
    title: 'Confirm to Menu?',
    content: 'Go to Menu View?',
    action: () => {
      // Try to route to other view.
      appHistory.push('/tv-menu');
      // Capture the action and not proceeding further.
      // This is for history state demonstration.
      return true;
    }
  }
};

// Define the carousel settings
const carouselSettings = [
  {
    title: 'TV Show',
    api: 'getTvShowData'
  },
  {
    title: 'Categories',
    api: 'getMovieCategories'
  },
  {
    title: 'Movies',
    api: 'getMovieData'
  }
];

const defaultState = {
  popupOpened: false,
  popupType: POPUP_TYPES.EXIT.name,
  forwardFocus: 'carousel0',
  bgColor: 'white',
  pageTop: 0,
  dataLoaded: false,
  ovpData: []
};

class TVPage extends Component {
  constructor(...props) {
    super(...props);
    this.state = defaultState;
  }

  componentDidMount() {
    this.updateOvpData();
  }

  // Just return console log for the back action, i.e. default appHistory back will be used.
  onReceiveBack = () => {
    console.log('Default back action will be used.');
  };

  // An exit confirm popup is implemented. So popup will be shown and exit action will be delegated
  // to exit popup. Noted that  `true` is returned to grab the exit handling and default exit action
  // will not be triggered.
  onReceiveExit = () => {
    this.openPopup(POPUP_TYPES.EXIT.name);
    return true;
  };

  // Button click action for carousel.
  onCarouselBtnClick = () => {
    const { bgColor } = this.state;
    let toColor;

    switch (bgColor) {
      case 'white':
        toColor = 'red';
        break;
      case 'red':
        toColor = 'blue';
        break;
      case 'blue':
        toColor = 'white';
        break;
      default:
        console.debug('other color is not supported');
        break;
    }

    this.setState({
      bgColor: toColor
    });
  };

  onCarouselFocus = (carouselIndex, index) => {
    console.debug(
      `Carousel item focused, index: ${index}, carouselIndex: ${carouselIndex}`
    );

    this.setState({
      pageTop: -carouselIndex * 175 + 40
    });
  };

  updateOvpData() {
    Promise.all(carouselSettings.map(elt => ovp[elt.api]())).then(ovpData => {
      if (!ovpData.error) {
        this.setState({
          dataLoaded: true,
          ovpData
        });
      }
    });
  }

  openPopup = popupType => {
    if (this.state.popupOpened) {
      console.debug(`${this.state.popupType} popup is already showing`);
      return;
    }

    console.debug(`show ${popupType} popup`);
    this.setState({
      popupOpened: true,
      forwardFocus: 'pagePopup',
      popupType
    });
  };

  closePopup = action => {
    if (action && action()) {
      return;
    }

    this.setState({
      popupOpened: false,
      forwardFocus: 'carousel0'
    });

    // Focus back to the current page.
    this.props.pageFocusCurrent();
  };

  renderCarousels() {
    const prefix = 'carousel';
    return carouselSettings.map((el, index, arr) => (
      <div
        key={`${prefix}${index}`}
        style={{ position: 'relative', width: '1350px' }}
      >
        <div style={{ height: '30px' }}>{el.title}</div>
        <FocusCarousel
          items={this.state.ovpData[index] || []}
          keyProperty="id"
          col={5}
          nav={{
            id: `${prefix}${index}`,
            useLastFocus: true,
            nextup: index > 0 ? `${prefix}${index - 1}` : null,
            nextdown:
              index + 1 < arr.length
                ? `${prefix}${index + 1}`
                : 'goToMenuButton',
            parent: PAGE_NAV_ID
          }}
          displayObject={
            <SampleCarouselItem
              onFocus={this.onCarouselFocus.bind(this, index)}
              onClick={this.onCarouselBtnClick}
              width={256}
              height={144}
              padding={44}
            />
          }
        />
      </div>
    ));
  }

  render() {
    if (!this.state.dataLoaded) {
      return null;
    }

    const {
      popupOpened,
      popupType,
      forwardFocus,
      bgColor,
      pageTop
    } = this.state;
    const { title, content, action } = POPUP_TYPES[popupType];

    return (
      <Page
        className={theme.pageContent}
        onReceiveBack={this.onReceiveBack}
        onReceiveExit={this.onReceiveExit}
        nav={{
          id: PAGE_NAV_ID,
          nextdown: 'footermenu',
          nextup: 'TVVikimapMenu',
          useLastFocus: true,
          forwardFocus
        }}
        style={{
          height: '590px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            backgroundColor: bgColor,
            position: 'relative',
            top: `${pageTop}px`
          }}
        >
          {this.renderCarousels()}
          <FocusButton
            style={{
              paddingTop: '10px'
            }}
            nav={{
              id: 'goToMenuButton',
              nextup: `carousel${carouselSettings.length - 1}`,
              parent: PAGE_NAV_ID
            }}
            onClick={() => this.openPopup(POPUP_TYPES.TO_MENU.name)}
          >
            {POPUP_TYPES.TO_MENU.content}
          </FocusButton>
          <FocusPopup
            nav={{
              id: 'pagePopup'
            }}
            title={title}
            open={popupOpened}
            modal
            content={content}
            onCancel={() => this.closePopup()}
            onOK={() => this.closePopup(action)}
            closeOnExit={false}
          />
        </div>
      </Page>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    pageFocusCurrent: () => dispatch(actions.pageFocusCurrent())
  })
)(TVPage);
