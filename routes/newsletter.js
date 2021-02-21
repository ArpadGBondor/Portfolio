var express = require('express');
var router = express.Router();
const { newsletterPost } = require('../controllers/newsletter');

/* POST newsletter listing. */
router.post('/', newsletterPost);

module.exports = router;
