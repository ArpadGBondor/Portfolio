var express = require('express');
var router = express.Router();
const { projectsIndex, projectsShow } = require('../controllers/projects');

/* GET projects page. */
router.get('/', projectsIndex);

/* GET projects/project page. */
router.get('/:project', projectsShow);

module.exports = router;
