import { createSlice } from "@reduxjs/toolkit"

interface authState{
    autorisationToken: string
}

const initialState: authState ={
    autorisationToken: ''
}

const authSlice = createSlice({
    name: "authToken",
    initialState,
    reducers: {
        authLogIn: (state, action) => {
            state.autorisationToken =action.payload
        },
        authLogOut: (state) => {
            state.autorisationToken=''
        }

    }
})
export const { authLogIn, authLogOut } = authSlice.actions;
export default authSlice.reducer;