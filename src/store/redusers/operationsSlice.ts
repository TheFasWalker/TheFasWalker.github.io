import { createSlice } from '@reduxjs/toolkit';
import { IOperation, Operation } from 'src/models/IOperation';
import type { PayloadAction } from '@reduxjs/toolkit';

interface OperationsState {
  operations: IOperation;
  isLoading: boolean;
  error: string;
}
const initialState: OperationsState = {
  operations: {
    data: [],
    pagination: {
      pageSize: 0,
      pageNumber: 0,
      total: 0,
    },
    sorting: {
      type: 'ASC',
      field: 'id',
    },
  },
  isLoading: false,
  error: '',
};

export const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    operationsFetching(state) {
      state.isLoading = true;
    },
    operationsFetchingSuccess(state, action: PayloadAction<IOperation>) {
      state.isLoading = false;
      state.error = '';
      state.operations = action.payload;
    },
    operationsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    operationsDeleteOperationById(state, action: PayloadAction<string>) {
      state.operations.data = state.operations.data.filter((operation) => operation.id !== action.payload);
      state.isLoading = false;
    },
    operationCreating(state, action: PayloadAction<Operation>) {
      state.isLoading = false;
      state.operations.data.push(action.payload);
    },
    operationEdit(state, action) {
      state.isLoading = false;
      let editingElementIndex;
      state.operations.data.forEach((elem, index) => {
        if (elem.id == action.payload.id) {
          return (editingElementIndex = index);
        }
      });
      state.operations.data = state.operations.data.filter((elem) => elem.id !== action.payload.id);
      state.operations.data.splice(editingElementIndex, 0, action.payload);
    },
  },
});
export default operationsSlice.reducer;
