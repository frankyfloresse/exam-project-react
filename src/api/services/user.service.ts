import { axiosInstance } from '../axiosInstance.ts';
import { IUsersPaginated } from '../../types/IUsersPaginated.ts';
import { IUser } from '../../types/IUser.ts';
import { IPaginationOptions } from '../../types/IPaginationOptions.ts';

export const getAllUsers = async (params: IPaginationOptions): Promise<IUsersPaginated> => {
    const { data } = await axiosInstance.get<IUsersPaginated>('/users', { params });
    return data;
};

export const searchUsers = async (searchText: string): Promise<IUsersPaginated> => {
    const { data } = await axiosInstance.get<IUsersPaginated>('/users/search', {
        params: {
            q: searchText,
        },
    });
    return data;
};

export const getUser = async (id: string): Promise<IUser> => {
    const { data } = await axiosInstance.get<IUser>(`/users/${id}`);
    return data;
};
