import config from '#/config';

// sample service
// export const get = () => config.app;

// use accedo one as configuration service
export const getAccedoOneService = accedoOneClient => ({
  get: () => {
    return accedoOneClient
      .getAllMetadata()
      .then(remoteConfig => {
        return {
          ...config.app,
          accedoOne: remoteConfig
        };
      })
      .catch(() => {
        return config.app;
      });
  }
});
