import accedoOne from '@accedo/accedo-one';
import config from '#/config';
import cookie from 'react-cookie';
import * as vikimap from 'vdkweb-vikimap';
import * as configuration from '#/services/configuration/configuration';
import * as status from '#/services/status/status';

let client;

const WEBSTORAGE_DEVICE_ID = 'a1_d';
const WEBSTORAGE_SESSION_KEY = 'a1_s';

export const getAccedoOneClient = (customizedConfig = null) => {
  if (
    (!config || !config.accedoOne || !config.accedoOne.appKey) &&
    (!customizedConfig ||
      !customizedConfig.accedoOne ||
      !customizedConfig.accedoOne.appKey)
  ) {
    console.error('No Accedo One settings available..');
    return null;
  }

  let accedoOneSettings = customizedConfig || config.accedoOne;

  if (typeof window === 'object') {
    accedoOneSettings = Object.assign(accedoOneSettings, {
      browserInfoProvider: () => ({
        deviceId: cookie.load(WEBSTORAGE_DEVICE_ID),
        sessionKey: cookie.load(WEBSTORAGE_SESSION_KEY)
      }),
      onDeviceIdGenerated: id => {
        cookie.save(WEBSTORAGE_DEVICE_ID, id, { path: '/', maxAge: 315360000 });
      },
      onSessionKeyChanged: key => {
        cookie.save(WEBSTORAGE_SESSION_KEY, key, {
          path: '/',
          maxAge: 315360000
        });
      }
    });

    client = client || accedoOne(accedoOneSettings);

    return client;
  }

  client = accedoOne(accedoOneSettings);

  return client;
};

export const getAccedoOneServices = accedoOneClient => ({
  configuration: configuration.getAccedoOneService(accedoOneClient),
  status: status.getAccedoOneService(accedoOneClient),
  vikimap: vikimap.getAccedoOneService(accedoOneClient)
});
