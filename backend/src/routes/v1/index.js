const express = require('express');
const router = express.Router();

router.use('/pages', require('./allPage'));

module.exports = router;