import { createSlice } from '@reduxjs/toolkit';
import { Category, categoryData } from 'src/models/category';
import type { PayloadAction } from '@reduxjs/toolkit';

type categoriesData = {
  data: categoryData;
  isLoading: boolean;
  error: string;
};

const initialState: categoriesData = {
  data: {
    data: [],
    pagination: {
      pageSize: 0,
      pageNumber: 0,
      total: 0,
    },
    sorting: {
      type: 'ASC',
      field: 'name',
    },
  },
  isLoading: false,
  error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesFetching(state) {
      state.isLoading = true;
    },
    categoriesFetchingSuccess(state, action: PayloadAction<categoryData>) {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    categoriesFetchingError(state, action: PayloadAction<string>) {
      (state.isLoading = false), (state.error = action.payload);
    },
    categoriesDeleteById(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.data.data = state.data.data.filter((elem) => elem.id !== action.payload);
    },
    categoriesCreate(state, action: PayloadAction<Category>) {
      state.isLoading = false;
      state.data.data.push(action.payload);
    },
    categoriesPatch(state, action: PayloadAction<Category>) {
      state.isLoading = false;

      let editerElementIndex;
      state.data.data.forEach((elem, index) => {
        if (elem.id == action.payload.id) {
          return (editerElementIndex = index);
        }
      });
      state.data.data = state.data.data.filter((elem) => elem.id !== action.payload.id);
      state.data.data.splice(editerElementIndex, 0, action.payload);
    },
  },
});
export default categoriesSlice.reducer;
