import { axiosInstance } from '../axiosInstance.ts';
import { IRecipesPaginated } from '../../types/IRecipesPaginated.ts';
import { IRecipe } from '../../types/IRecipe.ts';
import { IPaginationOptions } from '../../types/IPaginationOptions.ts';

export const getAllRecipes = async (q: string, params: IPaginationOptions): Promise<IRecipesPaginated> => {
    const { data } = await axiosInstance.get<IRecipesPaginated>('/auth/recipes/search', { params: { q, ...params } });
    return data;
};

export const getRecipe = async (id: string): Promise<IRecipe> => {
    const { data } = await axiosInstance.get<IRecipe>(`/auth/recipes/${id}`);
    return data;
};

export const getRecipesByTag = async (tag: string, params: IPaginationOptions): Promise<IRecipesPaginated> => {
    const { data } = await axiosInstance.get<IRecipesPaginated>(`/auth/recipes/tag/${tag}`, { params });
    return data;
};
