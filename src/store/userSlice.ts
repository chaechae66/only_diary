import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser, User } from '../types/types';

const initialState = {
    currentUser : null,
    isLoading : false,
} as User

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user_login: (state : User, action : PayloadAction<CurrentUser>) => {
        state.currentUser = action.payload;
        state.isLoading = true;
    },
        user_logout: (state : User) => {
        state.currentUser = null;
        state.isLoading = true;
    },
        update_photo: (state : User ,action : PayloadAction<string>) => {
        state.currentUser.photoURL = action.payload;
        state.isLoading = true;
        }
    },
})

export const { user_login, user_logout, update_photo } = userSlice.actions

export default userSlice.reducer