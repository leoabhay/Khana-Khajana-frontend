import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const recipeService = {
  getRecipes: (query = '') => api.get(`/recipes?q=${query}`),
  getRecipesByIngredients: (ingredients) => api.get(`/recipes/findByIngredients?ingredients=${ingredients}`),
  getRecipeById: (id) => api.get(`/recipes/${id}`),
  saveRecipe: (recipeData) => api.post('/recipes/save', recipeData),
  getMyRecipes: () => api.get('/recipes/my-recipes'),
  createRecipe: (recipeData) => api.post('/recipes', recipeData),
  updateRecipe: (id, recipeData) => api.put(`/recipes/${id}`, recipeData),
  deleteRecipe: (id) => api.delete(`/recipes/${id}`),
  getAllLocalRecipes: () => api.get('/recipes/all-local'),
  verifyRecipe: (id, status) => api.patch(`/recipes/verify/${id}`, { status }),
};

export const authService = {
  login: (credentials) => api.post('/user/login', credentials),
  signup: (userData) => api.post('/user/create', userData),
  verifyOTP: (data) => api.post('/user/verify-otp', data),
  logout: () => api.post('/user/logout'),
  getProfile: () => api.get('/user/me'),
  updateMe: (userData) => api.put('/user/update-me', userData),
  forgotPassword: (data) => api.post('/user/forgot-password', data),
  resetPassword: (data) => api.post('/user/reset-password', data),
  // Favorites
  toggleFavorite: (recipeId) => api.post('/user/toggle-favorite', { recipeId }),
  getFavorites: () => api.get('/user/favorites'),
  // Admin
  getAnalytics: () => api.get('/user/analytics'),
  getAllUsers: () => api.get('/user/getAll'),
  updateUser: (userId, userData) => api.put(`/user/update/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/user/delete/${userId}`),
};

export default api;