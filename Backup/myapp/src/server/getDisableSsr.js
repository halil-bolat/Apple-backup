import useragent from 'useragent';

import config from '#/config';
import logger from '#/utils/logger';

const getDisableSsr = ({ req }) => {
  if (config.server.disableSsr === false) {
    return false;
  }

  const agent = useragent.parse(req.headers['user-agent']);
  const device = agent.device.toJSON();

  if (device.family === 'Spider' && !config.server.disableSsr) {
    logger.debug(
      `${logger.tags.SERVER}Enabling Server Side Rendering due to spider bot: ${
        req.headers['user-agent']
      }`
    );

    return false;
  }

  return true;
};

export default getDisableSsr;
