import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginRequest } from '../../types/ILoginRequest.ts';
import { login } from '../../api/services/auth.service.ts';
import { IUserWithTokens } from '../../types/IUserWithTokens.ts';
import { retrieveLocalStorage } from '../../utils/retrieveLocalStorage.ts';
import { AUTH_USER_KEY } from '../../constants/localStorageKeys.ts';

interface AuthSliceType {
    authUser: IUserWithTokens | null;
}

const initialState: AuthSliceType = {
    authUser: retrieveLocalStorage<IUserWithTokens>(AUTH_USER_KEY),
};

const authLogin = createAsyncThunk('authSlice/authLogin', async (request: ILoginRequest, thunkAPI) => {
    try {
        const userWithTokens = await login(request);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithTokens));
        return thunkAPI.fulfillWithValue(userWithTokens);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(authLogin.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
                state.authUser = action.payload;
            })
            .addCase(authLogin.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            }),
});

export const authSliceActions = {
    ...authSlice.actions,
    authLogin,
};
