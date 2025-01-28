import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((request) => {
    request.headers.set('');
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.message) {
            console.log(error.message);
        }
    }
);
