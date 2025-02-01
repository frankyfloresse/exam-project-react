import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser.ts';
import { getUser } from '../../api/services/user.service.ts';
import { getAllRecipes } from '../../api/services/recipe.service.ts';
import { IRecipe } from '../../types/IRecipe.ts';

type UserSliceType = {
    user: IUser | null;
    recipes: IRecipe[];
};

const initialState: UserSliceType = {
    user: null,
    recipes: [],
};

const loadUser = createAsyncThunk('userSlice/loadUser', async (id: string, thunkAPI) => {
    try {
        const user = await getUser(id);
        return thunkAPI.fulfillWithValue(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const loadUserRecipes = createAsyncThunk('userSlice/loadUserRecipes', async (id: string, thunkAPI) => {
    try {
        const { recipes } = await getAllRecipes('', { skip: 0, limit: 0 });
        const userRecipes = recipes.filter((recipe) => recipe.userId === Number(id));
        return thunkAPI.fulfillWithValue(userRecipes);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(loadUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
            .addCase(loadUserRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
            })
            .addCase(loadUserRecipes.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            }),
});

export const userSliceActions = {
    ...userSlice.actions,
    loadUser,
    loadUserRecipes,
};
