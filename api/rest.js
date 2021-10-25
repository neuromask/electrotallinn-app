const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const authenticationController = require('./controller/authenticationController');
const usersController = require('./controller/usersController');
const locationsController = require('./controller/locationsController');
const imagesController = require('./controller/imagesController');
const marketController = require('./controller/marketController');

const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Backend

app.use('/authentication', authenticationController);
app.use('/users', usersController);
app.use('/locations', locationsController);
app.use('/market', marketController);
app.use('/images', imagesController);

module.exports = app;
