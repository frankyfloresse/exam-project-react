import { IRecipe } from './IRecipe.ts';

export interface IRecipesPaginated {
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}
