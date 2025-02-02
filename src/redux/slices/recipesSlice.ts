import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/IRecipe.ts';
import { getAllRecipes, getRecipesByTag } from '../../api/services/recipe.service.ts';
import { IRecipesPaginated } from '../../types/IRecipesPaginated.ts';

type RecipesSliceType = {
    recipes: IRecipe[];
    limit: number;
    skip: number;
    total: number;
    searchText: string;
    tag: string;
    isLoading: boolean;
};

const initialState: RecipesSliceType = {
    recipes: [],
    limit: 12,
    skip: 0,
    total: 0,
    searchText: '',
    tag: '',
    isLoading: false,
};

const loadRecipes = createAsyncThunk('recipesSlice/loadRecipes', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as { recipesSlice: RecipesSliceType };
        const { limit, skip, searchText, tag } = state.recipesSlice;

        if (tag) {
            const recipes = await getRecipesByTag(tag, { limit, skip });
            return thunkAPI.fulfillWithValue(recipes);
        } else {
            const recipes = await getAllRecipes(searchText, { limit, skip });
            return thunkAPI.fulfillWithValue(recipes);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const recipesSlice = createSlice({
    name: 'recipesSlice',
    initialState: initialState,
    reducers: {
        setSkip: (state, action: PayloadAction<number>) => {
            state.skip = action.payload;
        },
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
            state.skip = 0;
            state.tag = '';
        },
        setTag: (state, action: PayloadAction<string>) => {
            state.tag = action.payload;
            state.searchText = '';
            state.skip = 0;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadRecipes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipesPaginated>) => {
                state.recipes = action.payload.recipes;
                state.skip = action.payload.skip;
                state.total = action.payload.total;
                state.isLoading = false;
            })
            .addCase(loadRecipes.rejected, (state) => {
                state.isLoading = false;
            }),
});

export const recipesSliceActions = {
    ...recipesSlice.actions,
    loadRecipes,
};
