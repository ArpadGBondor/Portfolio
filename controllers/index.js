const debug = require('debug')('portfolio:home-control');
const { page } = require('./page');

module.exports = {
  homeIndex(req, res, next) {
    page('index', 'Home', req, res, next);
  },
};
