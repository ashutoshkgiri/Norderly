import axios from 'axios'
const s=https://norderly.onrender.com
const API = axios.create({
  baseURL: s|| 'http://localhost:4000/api'
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
