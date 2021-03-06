const express = require('express');
const utils = require("../utils/Utils.js");
const authenticationService = require("../service/AuthenticationService.js");

const router = express.Router();

router.post('/login', utils.validateTgHash, async function(request, response) {
    try {
        const tgUser = await authenticationService.handleLogin(request.body.id, request.tgUser);

        let token = utils.signJWT(tgUser);

        response.send({
            auth: true,
            token: token,
            user: tgUser
        });
    } catch (e) {
        response.status(500).send(`${e}`);
    }
});

router.post('/login/bot', async function(request, response) {
    try {
        const tgUser = await authenticationService.handleLogin(request.body.uin, request.body);

        let token = utils.signJWT(tgUser);

        response.send({
            auth: true,
            token: token,
            user: tgUser
        });
    } catch (e) {
        response.status(500).send(`${e}`);
    }
});

module.exports = router;
