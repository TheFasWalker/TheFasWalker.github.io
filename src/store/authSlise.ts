import {createSlice } from "@reduxjs/toolkit";
interface authState{
    login:boolean
}

const initialState: authState = {
    login: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogIn: (state) => {
            state.login = true
        },
        authLogOut: (state) => {
            state.login = false
        }
    }
});

export const { authLogIn, authLogOut } = authSlice.actions;
export default authSlice.reducer