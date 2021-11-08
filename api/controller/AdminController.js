const express = require('express');
const utils = require("../utils/Utils.js");
const locationsService = require("../service/LocationsService.js");

const router = express.Router();

// ### LOCATIONS ###

router.get('/locations', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let locations = await locationsService.findAll();
    response.send(locations);
});

// CREATE location
router.post('/locations', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.save(request.body);
    response.send(result);
});

// UPDATE location
router.put('/locations/:id(\\d+)', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.update(request.params.id, request.body);
    response.send(result);
});

// UPDATE location image
router.put('/locations/:id(\\d+)/image', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.updateImage(request.params.id, request.body.image)
    response.send(result);
});

// DELETE location
router.delete('/locations/:id(\\d+)', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.delete(request.params.id)
    response.send(result);
});

router.put('/locations/:id(\\d+)/confirmed/toggle', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.toggleConfirmed(request.params.id)
    response.send(result);
});

router.get('/locations/:id(\\d+)/reports', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let reports = await reportsService.findByLocationId(request.params.id);
    response.send(reports);
});

// DELETE report
router.delete('/locations/:id(\\d+)/reports/:reportId(\\d+)', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await reportsService.delete(request.params.reportId);
    response.send(result);
});

router.put('/locations/image/rotate/:imageName', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let image = await locationsService.rotateLocationImage(request.params.imageName, request.query.rotation ? parseInt(request.query.rotation) : 90);
    response.end(image, 'binary');
});


// ### USERS ###

// CREATE user
router.post('/users', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = usersService.create(request.body);
    response.send(result);
});

// DELETE user
router.delete('/users/:uin(\\d+)', utils.verifyJWT, utils.checkAuthentication, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await usersService.update(request.params.uin, request.body);
    response.send(result);
});

module.exports = router;
