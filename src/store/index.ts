import { configureStore } from '@reduxjs/toolkit';
import authReduser from './authSlise'
import dataReduser from './dataSlise'

export const store = configureStore({
    reducer: {
        auth: authReduser,
        data: dataReduser
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch