import React from 'react';
import { withRedux, UniversalPlayer, MediaType } from 'vdkweb-player';
import { Page } from 'vdkweb-tv-ui';
import { TVPlayer } from 'vdkweb-tv-player';
import styles from './tvWebPlayer.scss';
import TVPlayerControls from './TVPlayerControls';

const ReduxPlayer = withRedux(UniversalPlayer);

const Players = [
  {
    component: TVPlayer,
    supportedMediaTypes: [MediaType.MP4]
  }
];

const VIDEO_SIZE = {
  width: 900,
  height: 500,
  left: 500,
  top: 250
};

const SAMPLE_VIDEO_URL =
  'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4';

const TVWebPlayer = ({ theme = styles }) => (
  <Page
    className={theme.playerSection}
    nav={{
      id: 'playerPage',
      forwardFocus: 'tvplayerControl',
      nextdown: 'footermenu',
      nextup: 'TVVikimapMenu'
    }}
  >
    <div style={{ width: 900, minHeight: 500 }}>
      <ReduxPlayer
        mediaUrl={SAMPLE_VIDEO_URL}
        theme={theme}
        browserControls={false}
        hideControlsOnIdle={false}
        players={Players}
        onVideoDidMount={videoRef => {
          videoRef.getVideo().setVideoSizeAndPosition(VIDEO_SIZE);
        }}
      >
        <TVPlayerControls
          nav={{
            id: 'tvplayerControl',
            parent: 'playerPage'
          }}
        />
      </ReduxPlayer>
    </div>
  </Page>
);

export default TVWebPlayer;
