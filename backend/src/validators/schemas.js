const { z } = require('zod');

const weatherByLocationSchema = z.object({
  location: z.string().min(2, 'Location must be at least 2 characters'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
}).refine(
  (data) => new Date(data.endDate) >= new Date(data.startDate),
  { message: 'End date cannot precede start date', path: ['endDate'] }
).refine(
  (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff <= 5;
  },
  { message: 'Date range cannot exceed 5 days', path: ['endDate'] }
);

const weatherByCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
}).refine(
  (data) => new Date(data.endDate) >= new Date(data.startDate),
  { message: 'End date cannot precede start date', path: ['endDate'] }
).refine(
  (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff <= 5;
  },
  { message: 'Date range cannot exceed 5 days', path: ['endDate'] }
);

const updateRecordSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
}).refine(
  (data) => new Date(data.endDate) >= new Date(data.startDate),
  { message: 'End date cannot precede start date', path: ['endDate'] }
).refine(
  (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff <= 5;
  },
  { message: 'Date range cannot exceed 5 days', path: ['endDate'] }
);

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
}

module.exports = {
  validate,
  weatherByLocationSchema,
  weatherByCoordinatesSchema,
  updateRecordSchema,
};
