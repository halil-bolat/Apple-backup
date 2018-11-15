/* eslint-disable */

var xdk = {
  devices: [
    'android-webview',
    'lg-webos',
    'panasonic-html5',
    'playstation-webmaf',
    'samsung-tizen',
    'workstation'
  ],

  // What logger implementation should be used as the console.
  // 'base/logger/onScreenLogger' - Log to an on-screen semi-transparent DIV.
  // 'base/logger/nativeLogger' - Default. Log to the browser native console.
  //                              If this configuration is not defined, or what
  //                              is defined failed to load, native logger will
  //                              be used.
  'console.logger': 'base/logger/nativeLogger',

  // The lowest level that console will display
  // 0 - debug
  // 1 - info
  // 2 - log
  // 3 - warn
  // 4 - error
  // 5 or above - nothing will be logged.
  'console.level': 0,

  // Control whether TVKey events and mapping should be logged.
  // false: off
  // true: on
  'console.log.TVKey': false,

  // Control whether connection polling result should be logged.
  // false: off
  // true: on
  'console.log.ConnectionPoller': false,

  'onscreenlogger.key': 'KEY_2',
  'onscreenlogger.dimension': {
    top: 0,
    bottom: 0,
    left: null,
    right: 0,
    width: 440,
    height: null
  },
  'onscreenlogger.bgcolor': 'black',
  'onscreenlogger.fontColor': 'white',
  'onscreenlogger.maxline': null,

  'device-details': {
    'android-webview': {
      cookieName: 'xdk3-dva',
      network: {
        'polling-interval': 10
      }
    },

    'lg-webos': {
      cookieName: 'xdk3-dva',
      network: {
        'polling-interval': 10
      }
    },

    'panasonic-html5': {
      cookieName: 'xdk3-dva'
    },

    'playstation-webmaf': {
      cookieName: 'xdk3-dva'
    },

    'samsung-tizen': {
      cookieName: 'xdk3-dva',
      players: [
        {
          id: 'device/player/HTML5Player',
          extensions: [
            {
              type: 'subtitle',
              external: 'device/player/extension/HTML5PlayerExternalSubtitle'
            },
            {
              type: 'audio-track',
              strategy: 'device/player/extension/HTML5PlayerAudioTrack'
            }
          ]
        }
      ],
      network: {
        'polling-interval': 10
      },
      storages: [
        {
          id: 'device/storage/Local',
          type: 'local'
        },
        {
          id: 'device/storage/Cookie',
          type: 'cookie'
        }
      ]
    },

    workstation: {
      cookieName: 'xdk3-dva',
      network: {
        'polling-interval': 1000
      }
    }
  }
};
