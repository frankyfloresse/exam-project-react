import axios from 'axios';
import { retrieveLocalStorage } from '../utils/retrieveLocalStorage.ts';
import { IUserWithTokens } from '../types/IUserWithTokens.ts';
import { refreshAuthToken } from './services/auth.service.ts';

export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((request) => {
    const user = retrieveLocalStorage<IUserWithTokens>('user');
    if (user) {
        request.headers.set('Authorization', `Bearer ${user.accessToken}`);
    }
    return request;
});

axiosInstance.interceptors.response.use(
    (r) => r,
    async (error) => {
        const user = retrieveLocalStorage<IUserWithTokens>('user');

        // If user in storage and error is 401 - try refresh token
        if (user && error.status === 401) {
            try {
                // Try get new tokens
                const { accessToken, refreshToken } = await refreshAuthToken({
                    refreshToken: user.refreshToken,
                    expiresInMins: 1,
                });

                // If got new tokens, update user
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                localStorage.setItem('user', JSON.stringify(user));

                // Repeat last request
                return axiosInstance.request(error.config);
            } catch {
                // If refresh failed - logout
                localStorage.removeItem('user');
                location.href = '/';
            }
        } else if (error.status === 401) {
            location.href = '/';
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.message) {
            console.log(error.message);
        }
    }
);
