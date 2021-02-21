var express = require('express');
var router = express.Router();
const { skillsIndex } = require('../controllers/skills');

/* GET skills page. */
router.get('/', skillsIndex);

module.exports = router;
