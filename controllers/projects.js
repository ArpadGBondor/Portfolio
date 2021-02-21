const debug = require('debug')('portfolio:projects-control');
const { page } = require('./page');

module.exports = {
  projectsIndex(req, res, next) {
    page('projects', 'Projects', req, res, next);
  },

  projectsShow(req, res, next) {
    page('projects/' + req.params.project, 'Projects', req, res, next);
  },
};
