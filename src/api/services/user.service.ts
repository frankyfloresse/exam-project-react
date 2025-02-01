import { axiosInstance } from '../axiosInstance.ts';
import { IUsersPaginated } from '../../types/IUsersPaginated.ts';
import { IUser } from '../../types/IUser.ts';
import { IPaginationOptions } from '../../types/IPaginationOptions.ts';

export const getAllUsers = async (q: string, params: IPaginationOptions): Promise<IUsersPaginated> => {
    const { data } = await axiosInstance.get<IUsersPaginated>('/auth/users/search', { params: { q, ...params } });
    return data;
};

export const getUser = async (id: string): Promise<IUser> => {
    const { data } = await axiosInstance.get<IUser>(`/auth/users/${id}`);
    return data;
};
