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
};

const initialState: RecipesSliceType = {
    recipes: [],
    limit: 30,
    skip: 0,
    total: 0,
    searchText: '',
    tag: '',
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
            .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipesPaginated>) => {
                state.recipes = action.payload.recipes;
                state.skip = action.payload.skip;
                state.total = action.payload.total;
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
