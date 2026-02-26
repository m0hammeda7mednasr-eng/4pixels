import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
    const serverMessage = error.response?.data?.message || error.response?.data?.error;
    if (serverMessage) {
      error.userMessage = serverMessage;
    } else if (error.code === 'ECONNABORTED') {
      error.userMessage = 'Request timeout. Please try again.';
    } else if (!error.response) {
      error.userMessage = 'Network error. Check your connection.';
    } else {
      error.userMessage = 'Something went wrong. Please try again.';
    }

    return Promise.reject(error);
  }
);

export default api;
