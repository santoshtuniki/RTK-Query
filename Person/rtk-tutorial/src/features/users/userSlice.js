// module imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// component imports
import { getUsers, createUser } from './userApi';

export const getUsersAsync = createAsyncThunk('users/getUsers', async () => {
    const response = await getUsers();
    return response;
});

export const createUserAsync = createAsyncThunk('users/createUser', async (name) => {
    const response = await createUser(name);
    return response;
});

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        // getUsersAsync
        builder
            .addCase(getUsersAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        // createUserAsync
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Default export
export default usersSlice.reducer;