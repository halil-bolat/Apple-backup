import {
  LocalStorage,
  matchMedia,
  serviceMocker
} from 'vdkweb-test-utils/lib/mocks';

/*
 * Setup before running the test suite with Jest.
 * E.g. mocking browser API functions.
 */

// Mock the matchMedia API to be able to test react-slick
global.window.matchMedia = matchMedia;

global.localStorage = new LocalStorage();

jest.mock('react-dom');
jest.mock('@accedo/accedo-one', () => () =>
  serviceMocker({
    getLogLevel: { level: 'error' },
    sendLog: {},
    sendUsageStartEvent: {},
    sendUsageStopEvent: {},
    getApplicationStatus: {},
    getAllMetadata: {}
  })
);
