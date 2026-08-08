// Lightweight MongoDB operator injection protection.
// Strips keys starting with '$' or containing '.' from req.body/params/query
// without reassigning the (possibly read-only) request objects.
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return;

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
      continue;
    }
    const value = obj[key];
    if (value && typeof value === 'object') {
      sanitizeObject(value);
    }
  }
};

const sanitize = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  sanitizeObject(req.query);
  next();
};

export default sanitize;
