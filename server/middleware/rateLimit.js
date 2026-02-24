const DEFAULT_MESSAGE = 'Too many requests. Please try again shortly.';

const getClientKey = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.connection?.remoteAddress || 'unknown';
};

const createRateLimiter = ({
  windowMs = 60 * 1000,
  max = 60,
  message = DEFAULT_MESSAGE,
  keyFn = getClientKey
} = {}) => {
  const requests = new Map();

  return (req, res, next) => {
    const now = Date.now();

    if (requests.size > 5000) {
      for (const [storedKey, value] of requests.entries()) {
        if (value.expiresAt <= now) {
          requests.delete(storedKey);
        }
      }
    }

    const key = keyFn(req);
    const entry = requests.get(key);

    if (!entry || entry.expiresAt <= now) {
      requests.set(key, { count: 1, expiresAt: now + windowMs });
      return next();
    }

    if (entry.count >= max) {
      const retryAfterSeconds = Math.ceil((entry.expiresAt - now) / 1000);
      res.setHeader('Retry-After', String(Math.max(1, retryAfterSeconds)));
      return res.status(429).json({ message });
    }

    entry.count += 1;
    requests.set(key, entry);
    return next();
  };
};

module.exports = {
  createRateLimiter
};
