const express = require('express');
const { userrouter } = require('./marker/userRoute');
const {markerrouter} = require('./marker/markerRoute');
const apiRouter = express.Router();

apiRouter.use('/marker', markerrouter);

apiRouter.use('/user', userrouter);

module.exports = { apiRouter };
