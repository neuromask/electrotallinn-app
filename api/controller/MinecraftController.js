const express = require('express');
const minecraftService = require("../service/MinecraftService.js");

const router = express.Router();

// ### MINECRAFT ###

router.get('/statistics', async function(request, response) {
  let statistics = await minecraftService.getStatistics();

  response.send(statistics);
});

module.exports = router;
