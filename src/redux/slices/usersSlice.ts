import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser.ts';
import { getAllUsers } from '../../api/services/user.service.ts';
import { IUsersPaginated } from '../../types/IUsersPaginated.ts';

type UsersSliceType = {
    users: IUser[];
    limit: number;
    skip: number;
    total: number;
    searchText: string;
    isLoading: boolean;
};

const initialState: UsersSliceType = {
    isLoading: false,
    users: [],
    limit: 12,
    skip: 0,
    total: 0,
    searchText: '',
};

const loadUsers = createAsyncThunk('usersSlice/loadUsers', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as { usersSlice: UsersSliceType };
        const { limit, skip, searchText } = state.usersSlice;

        const users = await getAllUsers(searchText, { limit, skip });
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
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
            state.skip = 0;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUsersPaginated>) => {
                state.users = action.payload.users;
                state.skip = action.payload.skip;
                state.total = action.payload.total;
                state.isLoading = false;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                console.log(state);
                console.log(action);
                state.isLoading = false;
            }),
});

export const usersSliceActions = {
    ...usersSlice.actions,
    loadUsers,
};
