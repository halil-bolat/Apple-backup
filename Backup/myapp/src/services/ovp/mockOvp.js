import SessionData from './sessionData';
import movies from './data/movie.json';
import categories from './data/category.json';
import tvShows from './data/tvshow.json';

const DEFAULT_API_OPTS = {
  pageSize: 15,
  pageNumber: 1
};

const getPage = (data = [], opts = DEFAULT_API_OPTS) => {
  const { pageNumber, pageSize } = opts;
  return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const getMovieCount = () => {
  return Promise.resolve(movies.totalCount);
};

export const getMovieData = opts => {
  return Promise.resolve(getPage(movies.entries, opts)).then(data => {
    return data;
  });
};

export const getTvShowData = opts => {
  return Promise.resolve(getPage(tvShows.entries, opts));
};

export const getMovieCategories = opts => {
  // const random = Math.random();

  // Adding a forced error to test reloading of container data.
  // if (random > 0.2) {
  const res = getPage(categories.entries[0].categories, opts);
  return Promise.resolve(res);
  // }

  // return Promise.reject({ error: 'Forced error.' });
};

export const signIn = credentials => {
  if (credentials.password === '123') {
    return Promise.resolve(
      new SessionData({
        userId: credentials.email,
        token: Math.random()
          .toString(36)
          .substring(7),
        expiration: new Date().getTime() + 4 * 60 * 60 * 1000 // 4 hours
      })
    );
  }

  return Promise.reject({
    message: 'Unauthorized'
  });
};

export const signOut = () => {
  return Promise.resolve();
};

export const validateToken = (token, userId) => {
  return Promise.resolve({ valid: true, token, userId });
};
