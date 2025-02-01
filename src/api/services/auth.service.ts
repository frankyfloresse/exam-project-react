import { IUserWithTokens } from '../../types/IUserWithTokens.ts';
import { axiosInstance } from '../axiosInstance.ts';
import { IUser } from '../../types/IUser.ts';
import { ILoginRequest } from '../../types/ILoginRequest.ts';
import { ITokens } from '../../types/ITokens.ts';
import { IRefreshRequest } from '../../types/IRefreshRequest.ts';

export const login = async (request: ILoginRequest): Promise<IUserWithTokens> => {
    const { data } = await axiosInstance.post<IUserWithTokens>('/auth/login', request);
    return data;
};

export const getAuthUser = async (): Promise<IUser> => {
    const { data } = await axiosInstance.get<IUser>('/auth/me');
    return data;
};

export const refreshAuthToken = async (request: IRefreshRequest): Promise<ITokens> => {
    const { data } = await axiosInstance.post<ITokens>('/auth/refresh', request);
    return data;
};
