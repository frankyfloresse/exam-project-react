import { axiosInstance } from '../axiosInstance.ts';
import { IUsersPaginated } from '../../types/IUsersPaginated.ts';
import { IUser } from '../../types/IUser.ts';

export const getAllUsers = async (): Promise<IUsersPaginated> => {
    const { data } = await axiosInstance.get<IUsersPaginated>('/users');
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
