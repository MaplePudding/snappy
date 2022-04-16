import Request from './index';

export default new Request({
  baseURL: `${process.env.REACT_APP_HOST}`,
});
