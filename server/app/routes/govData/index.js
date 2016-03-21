'use strict';
const router = require('express').Router();
const rp = require('request-promise');
module.exports = router;

router.use('/', function(req, res, next) {
    var options = {
        uri: 'https://www.govtrack.us/api/v2/role?current=true',
        json: true // Automatically parses the JSON string in the response
    };
    rp(options)
        .then(function(data) {
        	res.status(201).send(data)
        })
        // https.get('https://www.govtrack.us/api/v2/role?current=true', (res) => {
        //     console.log(res);
        //     // consume response body
        //     res.resume();
        // }).on('error', (e) => {
        //     console.log(`Got error: ${e.message}`);
        // });
})