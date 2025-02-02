import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser.ts';
import { getUser } from '../../api/services/user.service.ts';
import { getAllRecipes } from '../../api/services/recipe.service.ts';
import { IRecipe } from '../../types/IRecipe.ts';

type UserSliceType = {
    user: IUser | null;
    recipes: IRecipe[];
    isLoading: boolean;
    isRecipesLoading: boolean;
};

const initialState: UserSliceType = {
    user: null,
    recipes: [],
    isLoading: false,
    isRecipesLoading: false,
};

const loadUser = createAsyncThunk('userSlice/loadUser', async (id: string, thunkAPI) => {
    try {
        const user = await getUser(id);
        return thunkAPI.fulfillWithValue(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Due to dummyjson doesn't have api for getting recipes by user id we are using this workaround
const loadUserRecipes = createAsyncThunk('userSlice/loadUserRecipes', async (id: string, thunkAPI) => {
    try {
        // limit: 0 allows load all recipes in one page
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
    reducers: {
        resetState: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(loadUser.rejected, (state, action) => {
                console.log(state);
                console.log(action);
                state.isLoading = false;
            })

            .addCase(loadUserRecipes.pending, (state) => {
                state.isRecipesLoading = true;
            })
            .addCase(loadUserRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
                state.isRecipesLoading = false;
            })
            .addCase(loadUserRecipes.rejected, (state) => {
                state.isRecipesLoading = false;
            }),
});

export const userSliceActions = {
    ...userSlice.actions,
    loadUser,
    loadUserRecipes,
};
