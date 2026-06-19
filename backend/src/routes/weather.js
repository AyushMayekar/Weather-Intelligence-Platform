const express = require('express');
const router = express.Router();
const { searchByLocation, searchByCoordinates } = require('../controllers/weatherController');
const { validate, weatherByLocationSchema, weatherByCoordinatesSchema } = require('../validators/schemas');

router.post('/', validate(weatherByLocationSchema), searchByLocation);
router.post('/coordinates', validate(weatherByCoordinatesSchema), searchByCoordinates);

module.exports = router;
