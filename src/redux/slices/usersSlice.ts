import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser.ts';
import { getAllUsers } from '../../api/services/user.service.ts';
import { IUsersPaginated } from '../../types/IUsersPaginated.ts';

type UsersSliceType = {
    users: IUser[];
};

const initialState: UsersSliceType = {
    users: [],
};

const loadUsers = createAsyncThunk('usersSlice/loadUsers', async (_, thunkAPI) => {
    try {
        const users = await getAllUsers();
        return thunkAPI.fulfillWithValue(users);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUsersPaginated>) => {
                state.users = action.payload.users;
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
