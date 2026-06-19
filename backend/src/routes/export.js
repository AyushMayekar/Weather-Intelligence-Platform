const express = require('express');
const router = express.Router();
const { exportCsv, exportJson } = require('../controllers/exportController');

router.get('/csv', exportCsv);
router.get('/json', exportJson);

module.exports = router;
