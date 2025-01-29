import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/IRecipe.ts';
import { getAllRecipes } from '../../api/services/recipe.service.ts';
import { IRecipesPaginated } from '../../types/IRecipesPaginated.ts';

type RecipesSliceType = {
    recipes: IRecipe[];
};

const initialState: RecipesSliceType = {
    recipes: [],
};

const loadRecipes = createAsyncThunk('recipesSlice/loadRecipes', async (_, thunkAPI) => {
    try {
        const recipes = await getAllRecipes();
        return thunkAPI.fulfillWithValue(recipes);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const recipesSlice = createSlice({
    name: 'recipesSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipesPaginated>) => {
                state.recipes = action.payload.recipes;
            })
            .addCase(loadRecipes.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            }),
});

export const recipesSliceActions = {
    ...recipesSlice.actions,
    loadRecipes,
};
