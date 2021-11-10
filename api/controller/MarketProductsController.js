const express = require('express');
const utils = require("../utils/Utils.js");
const marketProductsService = require("../service/MarketProductsService.js");

const router = express.Router();

router.get('/', async function(request, response) {
    let products = await marketProductsService.findAll();
    response.send(products);
});

module.exports = router;
