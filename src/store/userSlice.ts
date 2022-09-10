import { createSlice, PayloadAction  } from '@reduxjs/toolkit'

export interface User {
    currentUser: null | {
        uid : string,
        email : string,
        emailVerified: boolean,
        displayName : string,
        isAnonymous : boolean,
        photoURL : StaticRange,
    },
    isLoading : boolean,
    }

const initialState : User = {
    currentUser: null,
    isLoading : false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user_login: (state, action : PayloadAction<User>) => {
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