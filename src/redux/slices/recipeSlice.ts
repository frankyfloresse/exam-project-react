import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/IRecipe.ts';
import { getRecipe } from '../../api/services/recipe.service.ts';

type RecipeSliceType = {
    recipe: IRecipe | null;
    isLoading: boolean;
};

const initialState: RecipeSliceType = {
    recipe: null,
    isLoading: false,
};

const loadRecipe = createAsyncThunk('recipeSlice/loadRecipe', async (id: string, thunkAPI) => {
    try {
        const recipe = await getRecipe(id);
        return thunkAPI.fulfillWithValue(recipe);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: initialState,
    reducers: {
        resetState: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadRecipe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadRecipe.fulfilled, (state, action: PayloadAction<IRecipe>) => {
                state.recipe = action.payload;
                state.isLoading = false;
            })
            .addCase(loadRecipe.rejected, (state) => {
                state.isLoading = false;
            }),
});

export const recipeSliceActions = {
    ...recipeSlice.actions,
    loadRecipe,
};
