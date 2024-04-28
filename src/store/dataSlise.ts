import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICategory {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
}
type obj = {
  amount: number;
  createdAt: string;
  desc: string;
  id: string;
  type: string;
  updatedAt: string;
  category: ICategory[];
};
interface T {
  Array: obj;
}

const dataSlice = createSlice({
  name: 'data',
  initialState: [

  ],
  reducers: {
    addOperationsToStorage: (state, action) => {
      return (state = action.payload);
    },
    addOperartion: (state, action) => {
      // state.push(action.payload);
    },
    removeOperation: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((elem) => elem.id !== action.payload.id);
    },
    getSingleOperation: (state, action: PayloadAction<{ id: string }>) => {
      // console.log(action.payload.id)
      // console.log(state.filter((elem) => elem.id === action.payload.id));
      // console.log(state)
      // const item = state.filter((elem) => elem.id === action.payload.id)
      // console.log(item[0])
      // return item
    },
    editOperetion: (state) => {},
  },
});
export const { addOperartion, removeOperation, editOperetion, getSingleOperation, addOperationsToStorage } =
  dataSlice.actions;
export default dataSlice.reducer;