const express = require('express');
const utils = require("../utils/Utils.js");
const usersService = require("../service/UsersService.js");

const router = express.Router();

router.get('/', async function(request, response) {
    let result = await usersService.findAll();
    response.send(result);
});

router.get('/:uin(\\d+)', async function(request, response) {
    let user = await usersService.findByUin(request.params.uin);

    if (!user) {
        return response.status(404).send('User not found');
    }

    response.send(user);
});

// CREATE
router.post('/', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let result = usersService.create(request.body)
    response.send(result);
});

// UPDATE
router.put('/:uin(\\d+)', utils.authenticateJWT, async function(request, response) {
    if (+request.params.uin !== request.user.uin && request.user.role !== 'ADMIN') {
        console.warn('Saving %s not allowed for user with uin %s', JSON.stringify(request.body), request.user.uin);
        return response.status(403).send("Not allowed");
    }

    let result = await usersService.update(request.params.uin, request.body);
    response.send(result);
});

// DELETE
router.delete('/:uin(\\d+)', utils.authenticateJWT, utils.checkRole('ADMIN'), async function(request, response) {
    let result = await usersService.update(request.params.uin, request.body);
    response.send(result);
});

module.exports = router;
