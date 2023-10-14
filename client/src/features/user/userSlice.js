import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userName: '',
    email: '',
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserDetails: {
            reducer(state, action) {
                const { userName, email } = action.payload;
                state.userName = userName;
                state.email = email;
                state.isLoggedIn = true;
            }
        }
    }
})

export const userDetails = (state) => state.user;

export const { updateUserDetails } = userSlice.actions

export default userSlice.reducer