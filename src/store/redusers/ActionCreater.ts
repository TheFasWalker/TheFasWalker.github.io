import axios, { AxiosError } from "axios";
import { AppDispatch } from "../store";
import { IOperation } from "src/models/IOperation";
import { URL } from "src/client/config";
import { operationsSlice } from "./operationsSlice";
import { authSlice } from "./authSlice";
import { fetchData } from "src/client/fetch";
type AuthResult = {
    token: string;
  };




export const fetchOperations = () =>async (dispatch:AppDispatch) => {
    try {
        dispatch(operationsSlice.actions.operationsFetching())
        const response = await axios.get<IOperation[]>(`${URL}/operations`)
        dispatch(operationsSlice.actions.operationsFetchingSuccess(response.data))

    } catch (e) {
        dispatch(operationsSlice.actions.operationsFetchingError(e.message))
    }
}

export const autorisation = (email:string, password:string, commandId?:string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.auth())
        const data = {
            email: email,
            password: password,
            commandId:commandId
        }

        const response = fetchData<AuthResult>('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        dispatch(authSlice.actions.authSuccess((await response).token))

    } catch (e) {
        dispatch(authSlice.actions.authError(e))
    }
}
export const registration = (email:string, password:string, commandId:string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.auth())
        const data = {
            email: email,
            password: password,
            commandId:commandId
        }

        const response = fetchData<AuthResult>('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        dispatch(authSlice.actions.authSuccess((await response).token))

    } catch (e) {
        dispatch(authSlice.actions.authError(e))
    }
}