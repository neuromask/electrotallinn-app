const express = require('express');
const utils = require("../utils/Utils.js");
const locationsService = require("../service/LocationsService.js");
const reportsService = require("../service/ReportsService.js");

const router = express.Router();

router.get('/', async function(request, response) {
    let locations = await locationsService.findAll({ confirmed: 1 });
    response.send(locations);
});

router.get('/:id(\\d+)', async function(request, response) {
    let location = await locationsService.findOne(request.params.id);
    if (!!location) {
        response.send(location);
    } else {
        response.status(404).send('Location not found');
    }
});

router.get('/top', async function(request, response) {
    let result = await locationsService.getTopLocationSubmitters()
    response.send(result);
});

router.post('/report', utils.verifyJWT, async function(request, response) {
    if (request.user) {
        request.body.userUin = request.user.uin;
        request.body.userFirstName = request.user.firstName;
    }
    let result = await reportsService.create(request.body);
    response.send(result);
});

router.get('/image/:imageName', async function(request, response) {
    let image = await locationsService.findLocationImageByName(request.params.imageName);
    response.end(image, 'binary');
});

router.get('/nearest', async function(request, response) {
    if (!request.query.lat || !request.query.lng) {
        response.status(400).send('Coordinations missing');
    }

    let result = await locationsService.findNearestLocation(request.query.lat, request.query.lng)
    response.send(result);
});

module.exports = router;
