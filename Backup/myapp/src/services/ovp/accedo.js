import ovp from 'vdkweb-ovp-client-accedo';

ovp.ApiClient.prototype.getBaseUrl = () => {
  return '/ovp';
};

export const getMovieData = () => {
  const apiInstance = new ovp.MovieApi();

  const opts = {
    pageSize: 15,
    pageNumber: 1
  };

  return apiInstance
    .getAllMovies(opts)
    .then(data => {
      return data.entries.map(entry => {
        return {
          ...entry,
          displayText: entry.title
        };
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const getTvShowData = () => {
  const apiInstance = new ovp.TVShowApi();

  const opts = {
    pageSize: 15,
    pageNumber: 1
  };

  return apiInstance
    .getAllTvShows(opts)
    .then(data => {
      return data.entries.map(entry => {
        return {
          ...entry,
          displayText: entry.title,
          type: 'tvshow'
        };
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const getMovieCategories = () => {
  const apiInstance = new ovp.CategoryApi();

  const opts = {
    pageSize: 15,
    pageNumber: 1
  };

  return apiInstance
    .getAllCategories(opts)
    .then(data => {
      return data.entries.map(entry => {
        return {
          ...entry,
          displayText: entry.title
        };
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const signIn = credentials => {
  return new ovp.AuthApi().authenticate(
    credentials.email,
    credentials.password
  );
};

export const signOut = token => {
  return new ovp.AuthApi().invalidateToken(token);
};

export const validateToken = (token, userId) => {
  return new ovp.AuthApi().validateToken(token, userId);
};
