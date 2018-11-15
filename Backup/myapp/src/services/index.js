import cookie from 'cookie';
import * as ovp from '#/services/ovp';
import vikimap from '#/services/vikimap';
import * as queryParser from '#/services/ovp/queryParser';
import * as config from '#/config';
import {
  getAccedoOneClient,
  getAccedoOneServices
} from '#/services/accedoOne/accedoOne';

const getServices = accedoOneClient => {
  const accedoOneServices = getAccedoOneServices(accedoOneClient);

  return {
    ovp,
    queryParser,
    vikimap,
    configuration: accedoOneServices.configuration,
    status: accedoOneServices.status
  };
};

/**
 * Get the services that need to be used in redux on server side
 *
 * @param  {Object} req           The HTTP request object
 * @return {Objcet}               The services will be used in redux
 */
export const getServerServices = req => {
  let accedoOneClientConfig = {};
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

  accedoOneClientConfig = Object.assign(accedoOneClientConfig, {
    deviceId: cookies.a1_d,
    appKey: config.accedoOne.appKey
  });

  const accedoOneClient = getAccedoOneClient(accedoOneClientConfig);
  return getServices(accedoOneClient);
};

/**
 * Get the services that need to be used in redux on client side
 *
 * @return {Objcet}               The services will be used in redux
 */
export const getClientServices = () => {
  const accedoOneClient = getAccedoOneClient();
  return getServices(accedoOneClient);
};
