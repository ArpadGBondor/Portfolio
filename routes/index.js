var express = require('express');
var router = express.Router();
const { homeIndex } = require('../controllers/index');

/* GET home page. */
router.get('/', homeIndex);

module.exports = router;
