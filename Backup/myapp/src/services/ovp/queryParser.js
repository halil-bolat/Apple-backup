import * as ovp from './index';

export const executeQuery = query => {
  query = query.toLowerCase();

  if (query === 'moviecategories') {
    return ovp.getMovieCategories();
  }

  if (query === 'tvshowcategories') {
    return ovp.getTvShowCategories();
  }

  if (query.indexOf('tvshows') === 0) {
    if (query.indexOf('tvshowsbycategory') === 0 && ovp.getTvShowsByCategory) {
      const category = query.substring('tvshowsbycategory'.length).slice(1, -1);
      return ovp.getTvShowsByCategory(category);
    }

    return ovp.getTvShowData();
  }

  if (
    query.indexOf('movies') === 0 &&
    query.indexOf('moviesbycategory') === 0 &&
    ovp.getMoviesByCategory
  ) {
    const category = query.substring('moviesbycategory'.length).slice(1, -1);
    return ovp.getMoviesByCategory(category);
  }

  return ovp.getMovieData();
};
