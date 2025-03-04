const express = require('express');

const userRoutes = require('./user-route');
const uploadImageRoute = require('./image-route');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/upload-img', uploadImageRoute);

module.exports = router;
