import axios from 'axios';

const DEFAULT_API_URL = 'http://localhost:5001/api';
const DEFAULT_TIMEOUT_MS = 20000;

const parsedTimeout = Number(process.env.REACT_APP_API_TIMEOUT_MS);
const timeout =
  Number.isFinite(parsedTimeout) && parsedTimeout > 0
    ? parsedTimeout
    : DEFAULT_TIMEOUT_MS;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || DEFAULT_API_URL,
  timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

const responseCache = new Map();
const inFlightRequests = new Map();

const buildCacheKey = (url, params = {}) => {
  const normalizedParams =
    params && typeof params === 'object'
      ? JSON.stringify(
          Object.keys(params)
            .sort()
            .reduce((acc, key) => {
              acc[key] = params[key];
              return acc;
            }, {})
        )
      : '';

  return `${url}::${normalizedParams}`;
};

export const getCached = async (url, options = {}) => {
  const { params, ttl = 60000, force = false, signal } = options;
  const key = buildCacheKey(url, params);
  const now = Date.now();
  const cached = responseCache.get(key);

  if (!force && cached && cached.expiresAt > now) {
    return cached.data;
  }

  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }

  const requestPromise = api
    .get(url, { params, signal })
    .then((response) => {
      responseCache.set(key, {
        data: response.data,
        expiresAt: now + Math.max(1000, ttl)
      });
      return response.data;
    })
    .finally(() => {
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, requestPromise);
  return requestPromise;
};

export const clearApiCache = (matcher) => {
  if (!matcher) {
    responseCache.clear();
    return;
  }

  for (const key of responseCache.keys()) {
    if (typeof matcher === 'string' && key.startsWith(`${matcher}::`)) {
      responseCache.delete(key);
      continue;
    }

    if (matcher instanceof RegExp && matcher.test(key)) {
      responseCache.delete(key);
      continue;
    }

    if (typeof matcher === 'function' && matcher(key)) {
      responseCache.delete(key);
    }
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('API Error:', error);
    }

    const serverMessage = error.response?.data?.message || error.response?.data?.error;
    if (serverMessage) {
      error.userMessage = serverMessage;
    } else if (error.code === 'ECONNABORTED') {
      error.userMessage = 'Request timeout. Server is taking too long to respond.';
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      error.userMessage = `Cannot connect to server. Please verify API URL (${api.defaults.baseURL}).`;
    } else if (error.response?.status === 404) {
      error.userMessage = 'Resource not found.';
    } else if (error.response?.status === 500) {
      error.userMessage = 'Server error. Please try again later.';
    } else {
      error.userMessage = 'Something went wrong. Please try again.';
    }

    return Promise.reject(error);
  }
);

export default api;
