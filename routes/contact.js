var express = require('express');
var router = express.Router();
const { contactPostMessage } = require('../controllers/contact');

router.post('/', contactPostMessage);

module.exports = router;
