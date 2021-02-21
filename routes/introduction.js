var express = require('express');
var router = express.Router();
const { introductionIndex } = require('../controllers/introduction');

/* GET introduction page. */
router.get('/', introductionIndex);

module.exports = router;
