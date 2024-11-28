import axios from 'axios';


const apiClient = axios.create({
  baseURL: import.meta.env.BACKEND_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;