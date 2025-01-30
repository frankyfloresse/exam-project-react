import { axiosInstance } from '../axiosInstance.ts';
import { IRecipesPaginated } from '../../types/IRecipesPaginated.ts';
import { IRecipe } from '../../types/IRecipe.ts';
import { IPaginationOptions } from '../../types/IPaginationOptions.ts';

export const getAllRecipes = async (params: IPaginationOptions): Promise<IRecipesPaginated> => {
    const { data } = await axiosInstance.get<IRecipesPaginated>('/recipes', { params });
    return data;
};

export const searchRecipes = async (searchText: string): Promise<IRecipesPaginated> => {
    const { data } = await axiosInstance.get<IRecipesPaginated>('/recipes/search', {
        params: {
            q: searchText,
        },
    });

    return data;
};

export const getRecipe = async (id: string): Promise<IRecipe> => {
    const { data } = await axiosInstance.get<IRecipe>(`/recipes/${id}`);
    return data;
};

export const getRecipeByTag = async (tag: string): Promise<IRecipesPaginated> => {
    const { data } = await axiosInstance.get<IRecipesPaginated>(`/recipes/${tag}`);
    return data;
};
