import React, { Component } from 'react';
import { PlayerControls, SeekBar, PlayPause } from 'vdkweb-player';
import { withFocus } from 'vdkweb-navigation';
import { FocusDiv } from 'vdkweb-tv-ui';
import { environment as sEnv, CONSTANT } from 'xdk3';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const DEFAULT_SEEK_DELTA = 10;

const DefaultComponent = ({ nav = {} }) => (
  <div
    style={{
      color: 'white',
      width: '45px',
      height: '45px',
      padding: '20px 10px'
    }}
  >
    {nav.id}
  </div>
);

const withMouseHandle = WrappedComponent => props => {
  const { theme = {}, nav = {} } = props;

  return (
    <span
      style={{
        backgroundColor: nav.isFocused ? 'grey' : 'black'
      }}
      className={theme[nav.id]}
      onMouseOver={nav.onMouseOver}
      onMouseOut={nav.onMouseOut}
    >
      <WrappedComponent {...props} />
    </span>
  );
};

const FocusPlayPause = withFocus(withMouseHandle(PlayPause));
const FocusRWButton = withFocus(withMouseHandle(DefaultComponent));
const FocusFFButton = withFocus(withMouseHandle(DefaultComponent));

class TVPlayerControls extends Component {
  componentWillMount() {
    sEnv.addEventListener(sEnv.SYSTEM.KEYDOWN, this.keyEventListener);
  }

  componentWillUnmount() {
    sEnv.removeEventListener(sEnv.SYSTEM.KEYDOWN, this.keyEventListener);
  }

  keyEventListener = ({ id }) => {
    const { PLAY_PAUSE, PLAY, PAUSE, STOP, RW, FF } = CONSTANT.KEY;
    const {
      onTogglePlay,
      onPlay,
      onPause,
      onSeek,
      seekDelta = DEFAULT_SEEK_DELTA,
      onStop = () => {
        console.warn('onStop not passed from player');
      }
    } = this.props;

    switch (id) {
      case PLAY_PAUSE.id:
        onTogglePlay();
        break;
      case PLAY.id:
        onPlay();
        break;
      case PAUSE.id:
        onPause();
        break;
      case STOP.id:
        onPause();
        onSeek(0);
        onStop();
        break;
      case RW.id:
        onSeek({ delta: -seekDelta });
        break;
      case FF.id:
        onSeek({ delta: seekDelta });
        break;
      default:
        // ignore the other key events
        break;
    }
  };

  render() {
    const {
      nav = {},
      onShowControls,
      onTogglePlay,
      onSeek,
      seekDelta = DEFAULT_SEEK_DELTA,
      ...otherProps
    } = this.props;

    return (
      <FocusDiv
        nav={{
          ...nav,
          forwardFocus: 'playPauseBtn'
        }}
      >
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <PlayerControls {...otherProps}>
            <FocusPlayPause
              nav={{
                id: 'playPauseBtn',
                nextright: 'RW',
                parent: nav.parent
              }}
              onFocus={onShowControls}
              onClick={onTogglePlay}
            />
            <FocusRWButton
              nav={{
                id: 'RW',
                nextleft: 'playPauseBtn',
                nextright: 'FF',
                parent: nav.parent
              }}
              onFocus={onShowControls}
              onClick={() => onSeek({ delta: -seekDelta })}
            />
            <FocusFFButton
              nav={{
                id: 'FF',
                nextleft: 'RW',
                parent: nav.parent
              }}
              onFocus={onShowControls}
              onClick={() => onSeek({ delta: seekDelta })}
            />
            <SeekBar />
          </PlayerControls>
        </MuiThemeProvider>
      </FocusDiv>
    );
  }
}

export default TVPlayerControls;
