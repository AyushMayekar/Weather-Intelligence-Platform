require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weather');
const historyRoutes = require('./routes/history');
const exportRoutes = require('./routes/export');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/weather', weatherRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/export', exportRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Weather Intelligence API running on port ${PORT}`);
});
