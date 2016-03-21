'use strict';
const router = require('express').Router();
const govData = require('./govData');
module.exports = router;

router.use('/members', require('./members'));
router.use('/govData', govData)
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
