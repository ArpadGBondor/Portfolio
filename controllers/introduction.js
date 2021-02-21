const debug = require('debug')('portfolio:introduction-control');
const { page } = require('./page');

module.exports = {
  introductionIndex(req, res, next) {
    page('introduction', 'Introduction', req, res, next);
  },
};
