const express = require('express');
const router = express.Router();

router.use('/pages', require('./allPages'));

module.exports = router;