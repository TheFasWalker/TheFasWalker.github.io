import { combineReducers, configureStore } from "@reduxjs/toolkit";
import operationsReduser from './redusers/operationsSlice'
import authReduser from './redusers/authSlice'

const rootReduser = combineReducers({
    operationsReduser,
    authReduser
})

export const setupStore = () => {
    return configureStore({
        reducer:rootReduser
    })
}

export type RootState = ReturnType<typeof rootReduser>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']