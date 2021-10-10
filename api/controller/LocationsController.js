const express = require('express');
const utils = require("../utils/Utils.js");
const locationsService = require("../service/LocationsService.js");

const router = express.Router();

router.get('/', async function(request, response) {
    let locations = await locationsService.findAll();
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

// CREATE
router.post('/', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.save(request.body);
    response.send(result);
});

// UPDATE
router.put('/:id(\\d+)', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.update(request.params.id, request.body);
    response.send(result);
});

// UPDATE image
router.put('/:id(\\d+)/image', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.updateImage(request.params.id, request.body.image)
    response.send(result);
});

// DELETE
router.delete('/:id(\\d+)', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.delete(request.params.id)
    response.send(result);
});

router.put('/:id(\\d+)/confirmed/toggle', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await locationsService.toggleConfirmed(request.params.id)
    response.send(result);
});

router.get('/top', async function(request, response) {
    let result = await locationsService.getTopLocationSubmitters()
    response.send(result);
});

router.get('/image/:imageName', async function(request, response) {
    let image = await locationsService.findLocationImageByName(request.params.imageName);
    response.end(image, 'binary');
});

router.put('/image/rotate/:imageName', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let image = await locationsService.rotateLocationImage(request.params.imageName, request.query.rotation ? parseInt(request.query.rotation) : 90);
    response.end(image, 'binary');
});


module.exports = router;