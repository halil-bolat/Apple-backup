/**
 * Creates a Vikimap service which fetches Vikimap content from a given source.
 *
 * There are few different ways of initiating your Vikimap service:
 *
 * - vikimap.getAccedoOneService(accedoOneClient)
 * - vikimap.getMiddlewareService(middlewareRelativePath | middlewareAbsoluteUrl)
 * - vikimap.getJsonService(jsonObject | Promise)
 *
 * Examples of each can be seen below:
 *
 * ### Directly from Accedo One (without middleware proxy)
 *
 * ```
 * import { getAccedoOneClient } from '../accedoOne/accedoOne';
 * const vikimapService = vikimap.getAccedoOneService(getAccedoOneClient());
 * ````
 *
 * ### With middleware using a relative path
 * (NOTE: this won't work with server side rendering where fetch is expecting an absolute path)
 *
 *  ```
 * const vikimapService = vikimap.getMiddlewareService('/vikimap');
 * ````
 *
 * ### With middleware using an abslute URL
 *
 *  ```
 * const vikimapService = vikimap.getMiddlewareService('http://localhost:3000/vikimap');
 * ````
 *
 * ### Synchronous JSON load
 *
 * ```
 * import json from './map.json';
 * const vikimapService = vikimap.getJsonService(json);
 * ```
 *
 * ### Asynchronous JSON load
 * (getRemoteJson() returns a Promise)
 *
 * ```
 * import { getRemoteJson } from '<your-remote-json-service>';
 * const vikimapService = vikimap.getJsonService(getRemoteJson());
 * ```
 *
 * Note that you can also serve different services to different contexts.
 * E.g. you can use the global __CLIENT__ check to see if this is rendered
 * on the client and return a relative path middleware service. Otherwise
 * return an Accedo One service.
 *
 * ```
 * import { getAccedoOneClient } from '../accedoOne/accedoOne';
 *
 * let vikimapService;
 * if (typeof __CLIENT__ !== 'undefined' && __CLIENT__) {
 *   vikimapService = vikimap.getMiddlewareService('/vikimap');
 * } else {
 *   vikimapService = vikimap.getAccedoOneService(getAccedoOneClient());
 * }
 * ```
 *
 * @returns {VikimapService} A Vikimap service for fetching Vikimap content
 */

import * as vikimap from 'vdkweb-vikimap';
import json from './map.json';

const vikimapService = vikimap.getJsonService(json);

export default vikimapService;
