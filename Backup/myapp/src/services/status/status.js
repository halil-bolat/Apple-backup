// sample service
// export const getAppStatus = () => ({ content: 'active' });

// use accedo one as status service
export const getAccedoOneService = accedoOneClient => ({
  getAppStatus: () => accedoOneClient.getApplicationStatus()
});
