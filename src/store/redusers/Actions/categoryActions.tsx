import { AppDispatch } from "src/store/store";
import {categoriesSlice} from "../categoriesSlice";
import axios from "axios";
import {URL} from 'src/client/config'
import { CreateCategory } from "src/models/category";

export const getCategories = (token: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(categoriesSlice.actions.categoriesFetching());
      const response = axios.get(`${URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(categoriesSlice.actions.categoriesFetchingSuccess((await response).data));
    } catch (e) {
      dispatch(categoriesSlice.actions.categoriesFetchingError(e.message));
    }
};

export const deleteCategory = (token: string, id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(categoriesSlice.actions.categoriesFetching());
      axios.delete(`${URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch(categoriesSlice.actions.categoriesDeleteById(id));
    } catch (e) {
      dispatch(categoriesSlice.actions.categoriesFetchingError(e.message));
    }
};
export const createCategorie = (token: string, data: CreateCategory) => async (dispach: AppDispatch) => {
    try {
      dispach(categoriesSlice.actions.categoriesFetching());
      const response = axios.post(`${URL}/categories`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      dispach(categoriesSlice.actions.categoriesCreate((await response).data));
    } catch (e) {
      dispach(categoriesSlice.actions.categoriesFetchingError(e.message));
    }
};

export const editCategory = (token: string, id: string, data: CreateCategory) => async (dispatch: AppDispatch) => {
    try {
      dispatch(categoriesSlice.actions.categoriesFetching());

      const response = axios.put(`${URL}/categories/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch(categoriesSlice.actions.categoriesPatch((await response).data));
    } catch (e) {
      dispatch(categoriesSlice.actions.categoriesFetchingError(e.message));
    }
  };