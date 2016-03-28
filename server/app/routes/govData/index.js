'use strict';
const router = require('express').Router();
const rp = require('request-promise');
const mongoose = require('mongoose');
const Entry = mongoose.model('Entry');
const Lob = require('lob')('test_4d15c41ba8dbccab4e0f6bd342b24416c32');
const googleKey = 'AIzaSyCOcrg07w5wX6ti6qJcCGuCLeNXjRfdsfI';

module.exports = router;

router.post('/entry', function(req, res) {
    const recipient = req.body.recipient;
    const content = req.body.content;
    Entry.create(req.body)
    .then(function(newEntry){
        return Entry.find().sort({created_at: -1})
    })
    .then(function(entries){
        res.status(200).send(entries);
    })
})

router.post('/customAddress', function(req, res){
    Lob.verification.verify({
        address_line1: req.body.address,
        address_zip: req.body.zip
    }, function (err, response) {
        if(err){
            console.error(err)
            res.status(400).send({error: "Wrong address, brah."})
            return;
        } else if(response){
            let address = response.address;
            address = address.address_line1 + ' '+ address.address_city +' '+ address.address_state + ' '+ address.address_zip
            const locationOptions = {
                uri: 'https://www.googleapis.com/civicinfo/v2/representatives?address='+encodeURIComponent(address)+'&key='+encodeURIComponent(googleKey),
                json: true // Automatically parses the JSON string in the response
            }
            rp(locationOptions)
            .then(function(data){
                const civicData = formatCivicData(data);
                res.status(200).send(civicData);
                return;
            }).catch(function(err){
                console.error(err)
            })
        }
    });
})

router.get('/entries', function(req, res, next){
    Entry.find().sort({created_at: -1})
    .then(function(entries){
        res.status(200).send(entries)
    })
})
router.post('/', function(req, res, next) {
    console.log(req.body)
    const lat = req.body.lat;
    const lng = req.body.lng;    
    const locationOptions = {
        uri: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ encodeURIComponent(lat) + ',' + encodeURIComponent(lng) + '&key='+ encodeURIComponent(googleKey) + '&roles=legislatorUpperBody'
    }
    console.log(locationOptions.uri)
    rp(locationOptions)
    .then(function(address){
        address = JSON.parse(address);
        address = address.results[0].formatted_address;
        const options = {
            uri: 'https://www.googleapis.com/civicinfo/v2/representatives?address='+encodeURIComponent(address)+'&key='+encodeURIComponent(googleKey),
            json: true // Automatically parses the JSON string in the response
        };

        rp(options)
        .then(function(data){
            const civicData = formatCivicData(data);
            res.status(200).send(civicData)
        })
        .catch(function(err){
            console.error(err);
        })
    })
})
    
function formatCivicData(data){
    let representativesIdx = [];
    let senatorsIdx= [];
    let cityCouncilIdx = [];
    data.offices.forEach( office => {
        if(office.name.includes('United States House of Representatives')){
            office.officialIndices.forEach( idx => {
                representativesIdx.push(idx)
            })
        } else if(office.name.includes('United States Senate')){
            office.officialIndices.forEach( idx => {
                senatorsIdx.push(idx)
            })
        } else if(office.name.includes('Council, District')){
            office.officialIndices.forEach( idx => {
                cityCouncilIdx.push(idx)
            })
        } 
    })
    let representatives = [];
    let senators = [];
    let cityCouncilmen = [];
    representativesIdx.forEach( index => {
        representatives.push(data.officials[index])
    })
    senatorsIdx.forEach( index => {
        senators.push(data.officials[index])
    })
    cityCouncilIdx.forEach( index => {
        cityCouncilmen.push(data.officials[index])
    })
    const responseData = {
        representatives,
        senators,
        cityCouncilmen
    } 
    return responseData;
        
}
