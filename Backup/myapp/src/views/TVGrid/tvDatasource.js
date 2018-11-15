import ovp from '#/services/ovp';

// mock the amount to be 90 for now
let dataCount = 90;

const getTotalNumber = () => {
  return dataCount
    ? Promise.resolve(dataCount)
    : ovp.getMovieCount().then(count => {
        dataCount = count;
        return dataCount;
      });
};

const getData = (from, to) => {
  if (to > dataCount - 1) {
    to = dataCount - 1;
  }
  // currently it is a pagination get for grid
  const pageSize = to - from + 1;
  const pageNumber = Math.floor(from / pageSize) + 1;

  return ovp.getMovieData({ pageSize, pageNumber });
};

export default {
  getTotalNumber,
  getData
};
