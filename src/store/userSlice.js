import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    isLoading : false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user_login: (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = true;
    },
        user_logout: (state) => {
        state.currentUser = null;
        state.isLoading = true;
    },
        update_photo: (state,action) => {
        state.currentUser.photoURL = action.payload;
        state.isLoading = true;
        }
    },
})

export const { user_login, user_logout, update_photo } = userSlice.actions

export default userSlice.reducer