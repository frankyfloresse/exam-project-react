import { IUserWithTokens } from '../../types/IUserWithTokens.ts';
import { axiosInstance } from '../axiosInstance.ts';
import { ILoginRequest } from '../../types/ILoginRequest.ts';
import { ITokens } from '../../types/ITokens.ts';
import { IRefreshRequest } from '../../types/IRefreshRequest.ts';

export const login = async (request: ILoginRequest): Promise<IUserWithTokens> => {
    const response = await axiosInstance.post<IUserWithTokens>('/auth/login', request);
    return response?.data;
};

export const refreshAuthToken = async (request: IRefreshRequest): Promise<ITokens> => {
    const { data } = await axiosInstance.post<ITokens>('/auth/refresh', request);
    return data;
};
