const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs');
const prisma = require('../utils/prisma');

async function exportCsv(req, res, next) {
  try {
    const records = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const tmpPath = path.join(__dirname, '../../tmp_export.csv');

    const csvWriter = createObjectCsvWriter({
      path: tmpPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'location', title: 'Location' },
        { id: 'latitude', title: 'Latitude' },
        { id: 'longitude', title: 'Longitude' },
        { id: 'startDate', title: 'Start Date' },
        { id: 'endDate', title: 'End Date' },
        { id: 'temperature', title: 'Temperature (°C)' },
        { id: 'feelsLike', title: 'Feels Like (°C)' },
        { id: 'humidity', title: 'Humidity (%)' },
        { id: 'windSpeed', title: 'Wind Speed (km/h)' },
        { id: 'weatherCode', title: 'Weather Code' },
        { id: 'airQualityIndex', title: 'AQI' },
        { id: 'recommendation', title: 'Recommendation' },
        { id: 'createdAt', title: 'Saved At' },
      ],
    });

    const rows = records.map((r) => ({
      ...r,
      startDate: new Date(r.startDate).toISOString().split('T')[0],
      endDate: new Date(r.endDate).toISOString().split('T')[0],
      createdAt: new Date(r.createdAt).toISOString(),
    }));

    await csvWriter.writeRecords(rows);

    res.download(tmpPath, 'weather_history.csv', (err) => {
      fs.unlink(tmpPath, () => {});
      if (err) next(err);
    });
  } catch (err) {
    next(err);
  }
}

async function exportJson(req, res, next) {
  try {
    const records = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.setHeader('Content-Disposition', 'attachment; filename="weather_history.json"');
    res.setHeader('Content-Type', 'application/json');
    res.json(records);
  } catch (err) {
    next(err);
  }
}

module.exports = { exportCsv, exportJson };
