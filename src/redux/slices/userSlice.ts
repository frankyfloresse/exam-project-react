import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser.ts';
import { getUser } from '../../api/services/user.service.ts';

type UserSliceType = {
    user: IUser | null;
};

const initialState: UserSliceType = {
    user: null,
};

const loadUser = createAsyncThunk('userSlice/loadUser', async (id: string, thunkAPI) => {
    try {
        const user = await getUser(id);
        return thunkAPI.fulfillWithValue(user);
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
            }),
});

export const userSliceActions = {
    ...userSlice.actions,
    loadUser,
};
