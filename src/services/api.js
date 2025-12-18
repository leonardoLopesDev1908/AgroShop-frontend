import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isPublicRoute = (url) => {
      return (
        url.includes('/auth/me') ||
        url.includes('/auth/login') ||
        url.includes('/auth/logout') ||
        url.includes('/produtos') ||
        url.includes('/oauth2')
      );
    };

    if (isPublicRoute(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh-token', {}, { withCredentials: true });
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
}

    return Promise.reject(error);
  }
);

export default api;
