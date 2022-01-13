const express = require('express');
const homeService = require("../service/HomeService.js");

const router = express.Router();

// ### HOME ###

router.get('/statistics', async function(request, response) {
  let statistics = await homeService.getStatistics();

  response.send(statistics);
});

module.exports = router;
