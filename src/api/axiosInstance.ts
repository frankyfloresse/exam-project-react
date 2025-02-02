import axios from 'axios';
import { retrieveLocalStorage } from '../utils/retrieveLocalStorage.ts';
import { IUserWithTokens } from '../types/IUserWithTokens.ts';
import { refreshAuthToken } from './services/auth.service.ts';
import { BASE_URL } from '../constants/urls.ts';
import { AUTH_USER_KEY } from '../constants/localStorageKeys.ts';
import { TOKEN_LIFETIME } from '../constants/tokenLifetime.ts';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((request) => {
    const user = retrieveLocalStorage<IUserWithTokens>(AUTH_USER_KEY);
    if (user) {
        request.headers.set('Authorization', `Bearer ${user.accessToken}`);
    }
    return request;
});

axiosInstance.interceptors.response.use(
    (r) => r,
    async (error) => {
        const user = retrieveLocalStorage<IUserWithTokens>(AUTH_USER_KEY);

        // If user in storage and error is 401 - try refresh token
        if (user && error.status === 401) {
            try {
                // Try get new tokens
                const { accessToken, refreshToken } = await refreshAuthToken({
                    refreshToken: user.refreshToken,
                    expiresInMins: TOKEN_LIFETIME,
                });

                // If got new tokens, update user
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

                // Repeat last request
                return axiosInstance.request(error.config);
            } catch {
                // If refresh failed - logout
                localStorage.removeItem(AUTH_USER_KEY);
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
