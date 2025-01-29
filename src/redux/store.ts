import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice.ts';
import { usersSlice } from './slices/usersSlice.ts';
import { userSlice } from './slices/userSlice.ts';
import { recipesSlice } from './slices/recipesSlice.ts';
import { recipeSlice } from './slices/recipeSlice.ts';

export const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        usersSlice: usersSlice.reducer,
        userSlice: userSlice.reducer,
        recipesSlice: recipesSlice.reducer,
        recipeSlice: recipeSlice.reducer,
    },
});
