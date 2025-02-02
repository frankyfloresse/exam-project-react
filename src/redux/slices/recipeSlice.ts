import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/IRecipe.ts';
import { getRecipe } from '../../api/services/recipe.service.ts';

type RecipeSliceType = {
    recipe: IRecipe | null;
};

const initialState: RecipeSliceType = {
    recipe: null,
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
            .addCase(loadRecipe.fulfilled, (state, action: PayloadAction<IRecipe>) => {
                state.recipe = action.payload;
            })
            .addCase(loadRecipe.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            }),
});

export const recipeSliceActions = {
    ...recipeSlice.actions,
    loadRecipe,
};
