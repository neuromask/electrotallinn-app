const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const authenticationController = require('./controller/AuthenticationController');
const usersController = require('./controller/UsersController');
const locationsController = require('./controller/LocationsController');
const imagesController = require('./controller/ImagesController');
const marketProductsController = require('./controller/MarketProductsController');
const adminController = require('./controller/AdminController');

const app = express();

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Backend

app.use('/authentication', authenticationController);
app.use('/users', usersController);
app.use('/locations', locationsController);
app.use('/marketProducts', marketProductsController);
app.use('/images', imagesController);
app.use('/admin', adminController);

module.exports = app;
