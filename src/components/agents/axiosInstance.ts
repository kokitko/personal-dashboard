import axios from 'axios';
import { getAccessToken } from '../../auth/authService';

const backendApi = process.env.REACT_APP_BACKEND_API_URL;

const axiosInstance = axios.create({
    baseURL: backendApi,
    timeout: 10000,
    headers: { 
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getAccessToken()}`
     }
});

export default axiosInstance;