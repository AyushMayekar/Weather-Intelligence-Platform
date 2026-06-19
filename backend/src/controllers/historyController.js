const prisma = require('../utils/prisma');

async function getAll(req, res, next) {
  try {
    const records = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(records);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const record = await prisma.weatherSearch.findUnique({
      where: { id: req.params.id },
    });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { startDate, endDate } = req.body;

    const existing = await prisma.weatherSearch.findUnique({
      where: { id: req.params.id },
    });
    if (!existing) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updated = await prisma.weatherSearch.update({
      where: { id: req.params.id },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const existing = await prisma.weatherSearch.findUnique({
      where: { id: req.params.id },
    });
    if (!existing) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await prisma.weatherSearch.delete({ where: { id: req.params.id } });
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, update, remove };
