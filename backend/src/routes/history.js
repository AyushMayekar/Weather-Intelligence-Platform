const express = require('express');
const router = express.Router();
const { getAll, getById, update, remove } = require('../controllers/historyController');
const { validate, updateRecordSchema } = require('../validators/schemas');

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', validate(updateRecordSchema), update);
router.delete('/:id', remove);

module.exports = router;
