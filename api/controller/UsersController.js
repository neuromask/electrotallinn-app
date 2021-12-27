const express = require('express');
const utils = require("../utils/Utils.js");
const usersService = require("../service/UsersService.js");
const locationsService = require("../service/LocationsService.js");
const marketProductsService = require("../service/MarketProductsService.js");

const router = express.Router();

router.get('/', async function(request, response) {
    let result = await usersService.findAll();
    response.send(result);
});

router.get('/:uin(\\d+)', async function(request, response) {
    let result = await usersService.findByUin(request.params.uin);

    if (!result) {
        return response.status(404).send('User not found');
    }

    response.send(result);
});

router.get('/:uin(\\d+)/locations', async function(request, response) {
    let result = await locationsService.findByUserUin(request.params.uin);
    response.send(result);
});

router.get('/:uin(\\d+)/marketProducts', async function(request, response) {
    let result = await marketProductsService.findByUserUin(request.params.uin);
    response.send(result);
});

router.delete('/:uin(\\d+)/marketProducts/:marketProductId(\\d+)', utils.verifyJWT, utils.checkAuthentication, async function(request, response) {
    if (+request.params.uin !== request.user.uin && request.user.role !== 'ADMIN') {
        console.warn('Delete product %s not allowed for user with uin %s', request.params.marketProductId, request.user.uin);
        return response.status(403).send("Not allowed");
    }

    let marketProduct = await marketProductsService.findOne(request.params.marketProductId);
    if (marketProduct.userUin !== request.user.uin) {
        console.warn('Delete product %s not allowed for user with uin %s', request.params.marketProductId, request.user.uin);
        return response.status(403).send("Not allowed");
    }

    let result = await marketProductsService.delete(request.params.marketProductId, request.headers.authorization);
    response.send(result);
});

router.put('/:uin(\\d+)/marketProducts/:marketProductId(\\d+)/status/toggle', utils.verifyJWT, utils.checkAuthentication, async function(request, response) {
    if (+request.params.uin !== request.user.uin && request.user.role !== 'ADMIN') {
        console.warn('Status toggle for product %s not allowed for user with uin %s', request.params.marketProductId, request.user.uin);
        return response.status(403).send("Not allowed");
    }

    let marketProduct = await marketProductsService.findOne(request.params.marketProductId);
    if (marketProduct.userUin !== request.user.uin) {
        console.warn('Status toggle for product %s not allowed for user with uin %s', request.params.marketProductId, request.user.uin);
        return response.status(403).send("Not allowed");
    }

    let result = await marketProductsService.toggleStatus(request.params.marketProductId)
    response.send(result);
});

router.get('/image/:transportPhotoName', async function(request, response) {
    let image = await usersService.findTransportPhotoByName(request.params.transportPhotoName);
    response.end(image, 'binary');
});

// UPDATE
router.put('/:uin(\\d+)', utils.verifyJWT, utils.checkAuthentication, async function(request, response) {
    if (+request.params.uin !== request.user.uin && request.user.role !== 'ADMIN') {
        console.warn('Saving %s not allowed for user with uin %s', JSON.stringify(request.body), request.user.uin);
        return response.status(403).send("Not allowed");
    }

    let result = await usersService.update(request.params.uin, request.body);
    response.send(result);
});

router.put('/:uin(\\d+)/balance', utils.verifyJWT, utils.checkAuthentication, async function(request, response) {
  if (+request.params.uin !== request.user.uin && request.user.role !== 'ADMIN') {
    console.warn('Saving balance for %s not allowed for user with uin %s', JSON.stringify(request.body), request.user.uin);
    return response.status(403).send("Not allowed");
  }

  let result = await usersService.updateBalance(request.params.uin, request.body);
  response.send(result);
});

module.exports = router;
