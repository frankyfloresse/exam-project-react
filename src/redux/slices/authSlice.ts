import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginRequest } from '../../types/ILoginRequest.ts';
import { login } from '../../api/services/auth.service.ts';
import { IUserWithTokens } from '../../types/IUserWithTokens.ts';
import { retrieveLocalStorage } from '../../utils/retrieveLocalStorage.ts';
import { AUTH_USER_KEY } from '../../constants/localStorageKeys.ts';
import { isAxiosError } from 'axios';

interface AuthSliceType {
    authUser: IUserWithTokens | null;
    isLoading: boolean;
    error?: string;
}

const initialState: AuthSliceType = {
    authUser: retrieveLocalStorage<IUserWithTokens>(AUTH_USER_KEY),
    isLoading: false,
    error: '',
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
            .addCase(authLogin.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(authLogin.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
                state.authUser = action.payload;
                state.isLoading = false;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.isLoading = false;

                const error = action.payload;
                if (isAxiosError(error)) {
                    state.error = error.response?.data?.message || 'Server Error';
                }
            }),
});

export const authSliceActions = {
    ...authSlice.actions,
    authLogin,
};
