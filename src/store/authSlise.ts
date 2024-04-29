import {createSlice } from "@reduxjs/toolkit";
interface authState{
    login:string
}

const initialState: authState = {
    login: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogIn: (state,action) => {
            state.login = action.payload
        },
        authLogOut: (state) => {
            state.login = ''
        }
    }
});

export const { authLogIn, authLogOut } = authSlice.actions;
export default authSlice.reducer