import { storage } from '@/utils/storage';
import axios from 'axios';

/**
 * Retrieves the authentication token stored in AsyncStorage.
 *
 * @returns A promise that resolves to the stored token, or an empty string if no token is found or an error occurs.
 */
const getAuthToken = (): string => {
    try {
        const token = storage.getString("token");
        return token ?? '';
    } catch (error) {
        return '';
    }
};

/**
 * Axios instance configured with default settings, including authorization and device information.
 */
const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

/**
 * Interceptor for requests to modify headers with authentication token and device information.
 *
 * @param config - The Axios request configuration object.
 * @returns The modified configuration object with additional headers.
 */
axiosInstance.interceptors.request.use((config: any) => {
    // Retrieve token from storage
    const token = getAuthToken();

    // Modify the headers of the request
    config.headers = {
        ...config.headers
    };

    // Include the Authorization header if a token is available
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (err: any) => {
    return Promise.reject(err);
});

// axiosInstance.interceptors.response.use(response => {
//     return response;
// }, async error => {
//     if (error.response && error.response.status === 401) {
//         console.log("Token expired. Logging out...");
//         await AsyncStorage.removeItem('token');
//     }
//     return Promise.reject(error);
// });

export default axiosInstance;
