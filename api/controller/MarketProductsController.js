const express = require('express');
const utils = require("../utils/Utils.js");
const marketProductsService = require("../service/MarketProductsService.js");

const router = express.Router();

router.get('/', async function(request, response) {
    let products = await marketProductsService.findAll(Object.assign({status: 'ACTIVE'}, request.query));
    response.send(products);
});

router.get('/:id(\\d+)', async function(request, response) {
    let product = await marketProductsService.findOne(request.params.id);
    if (!!product) {
        response.send(product);
    } else {
        response.status(404).send('Product not found');
    }
});

// CREATE
router.post('/', utils.verifyJWT, utils.checkAuthentication, async function(request, response) {
    try {
        request.body.userUin = request.user.uin;
        request.body.userFirstName = request.user.firstName;

        let result = await marketProductsService.create(request.body, request.headers.authorization);
        response.send(result);
    } catch (e) {
        response.status(400).send(e);
    }
});

// UPDATE
router.put('/:id(\\d+)', utils.verifyJWT, utils.checkAuthentication, async function(request, response) {
    try {
        if (!marketProductsService.exists(request.params.id, request.user.uin) && request.user.role !== 'ADMIN') {
            console.warn('Saving product %s not allowed for user with uin %s', request.params.id, request.user.uin);
            return response.status(403).send("Not allowed");
        }

        let result = await marketProductsService.update(request.params.id, request.body, request.headers.authorization);
        response.send(result);
    } catch (e) {
        response.status(400).send(e);
    }
});

// DELETE
router.delete('/:id(\\d+)', utils.verifyJWT, utils.checkAuthentication, async function(request, response) {
    if (!marketProductsService.exists(request.params.id, request.user.uin) && request.user.role !== 'ADMIN') {
        console.warn('Deleting product %s not allowed for user with uin %s', request.params.id, request.user.uin);
        return response.status(403).send("Not allowed");
    }

    let result = await marketProductsService.delete(request.params.id);
    response.send(result);
});


module.exports = router;
