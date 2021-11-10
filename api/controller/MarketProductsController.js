const express = require('express');
const utils = require("../utils/Utils.js");
const marketProductsService = require("../service/MarketProductsService.js");

const router = express.Router();

router.get('/', async function(request, response) {
    let products = await marketProductsService.findAll();
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

module.exports = router;
