import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IOperation } from "src/models/IOperation";

interface OperationsState {
    operations: IOperation[],
    isLoading: boolean,
    error:string
}
const initialState: OperationsState = {
    operations: [],
    isLoading: false,
    error:''
}

export const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        operationsFetching(state) {
            state.isLoading = true;
         },
        operationsFetchingSuccess(state, action:PayloadAction<IOperation[]>) {
            state.isLoading = false;
            state.error = '';
            state.operations= action.payload
        },
        operationsFetchingError(state, action:PayloadAction<string>) {
            state.isLoading = false;
            state.error=action.payload
        }
    },

});
export default operationsSlice.reducer