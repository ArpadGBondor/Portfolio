const debug = require('debug')('portfolio:skills-control');
const { page } = require('./page');

module.exports = {
  skillsIndex(req, res, next) {
    page('skills', 'Skills', req, res, next);
  },
};
