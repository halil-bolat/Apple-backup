import httpProxy from 'http-proxy-middleware';
import logger from '#/utils/logger';

const proxy = (path, url) => {
  const p = httpProxy(path, {
    target: url,
    changeOrigin: true,
    pathRewrite: { [`^${path}`]: '' },
    logProvider: () => logger,
    onProxyReq: proxyReq => {
      logger.info('Proxy Req', proxyReq.path);
    },
    onProxyRes: proxyRes => {
      logger.info('Proxy Res:', proxyRes.statusCode, proxyRes.statusMessage);
    },
    onError: error => {
      logger.error(`Error for proxy: ${path} (${url}): ${error}`, {
        dim1: 'proxy',
        facilityCode: 70,
        errorCode: 100
      });
    }
  });

  return p;
};

export default proxy;
