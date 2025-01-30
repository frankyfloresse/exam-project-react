import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser.ts';
import { getAllUsers } from '../../api/services/user.service.ts';
import { IUsersPaginated } from '../../types/IUsersPaginated.ts';

type UsersSliceType = {
    users: IUser[];
    limit: number;
    skip: number;
    total: number;
};

const initialState: UsersSliceType = {
    users: [],
    limit: 30,
    skip: 0,
    total: 0,
};

const loadUsers = createAsyncThunk('usersSlice/loadUsers', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as { usersSlice: UsersSliceType };
        const { limit, skip } = state.usersSlice;

        const users = await getAllUsers({ limit, skip });
        return thunkAPI.fulfillWithValue(users);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: initialState,
    reducers: {
        setSkip: (state, action: PayloadAction<number>) => {
            state.skip = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUsersPaginated>) => {
                state.users = action.payload.users;
                state.skip = action.payload.skip;
                state.total = action.payload.total;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            }),
});

export const usersSliceActions = {
    ...usersSlice.actions,
    loadUsers,
};
