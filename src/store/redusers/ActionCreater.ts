import axios from 'axios';
import { AppDispatch } from '../store';
import { IOperation, Operation, OperationCreate } from 'src/models/IOperation';
import { URL } from 'src/client/config';
import { operationsSlice } from './operationsSlice';
import { authSlice } from './authSlice';
import { fetchData } from 'src/client/fetch';
import { writeCookies } from 'src/components/helpers/cookies';
import { profileSlice } from './userDataSlice';
import { Profile } from 'src/models/userData';
import { AuthResult } from 'src/models/IAuthResult';
import { categoriesSlice } from './categoriesSlice';
import { CreateCategory } from 'src/models/category';

export const fetchOperations = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(operationsSlice.actions.operationsFetching());
    let response;
    if (token) {
      response = axios.get<IOperation>(`${URL}/operations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      response = axios.get<IOperation>(`${URL}/operations`);
    }
    dispatch(operationsSlice.actions.operationsFetchingSuccess((await response).data));
  } catch (e) {
    dispatch(operationsSlice.actions.operationsFetchingError(e.message));
  }
};
export const deleteOperationById = (token: string, id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(operationsSlice.actions.operationsFetching());
    axios.delete(`${URL}/operations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(operationsSlice.actions.operationsDeleteOperationById(id));
  } catch (e) {
    dispatch(operationsSlice.actions.operationsFetchingError(e.message));
  }
};
export const crateOperation = (token: string, data: OperationCreate) => async (dispatch: AppDispatch) => {
  try {
    dispatch(operationsSlice.actions.operationsFetching());

    const response = axios.post<Operation>(`${URL}/operations`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    dispatch(operationsSlice.actions.operationCreating((await response).data));
  } catch (e) {
    dispatch(operationsSlice.actions.operationsFetchingError(e.message));
  }
};
export const editOperaton = (token: string, id: string, data: OperationCreate) => async (dispatch: AppDispatch) => {
  try {
    dispatch(operationsSlice.actions.operationsFetching());

    const response = axios.put<Operation>(`${URL}/operations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(operationsSlice.actions.operationEdit((await response).data));
  } catch (e) {
    dispatch(operationsSlice.actions.operationsFetchingError(e.message));
  }
};

export const autorisation = (email: string, password: string, commandId?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.auth());
    const data = {
      email: email,
      password: password,
      commandId: commandId,
    };

    const response = fetchData<AuthResult>('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    dispatch(authSlice.actions.authSuccess((await response).token));
    writeCookies('LoginToken', (await response).token);
  } catch (e) {
    dispatch(authSlice.actions.authError(e));
  }
};
export const registration = (email: string, password: string, commandId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.auth());
    const data = {
      email: email,
      password: password,
      commandId: commandId,
    };
    const response = fetchData<AuthResult>('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    dispatch(authSlice.actions.authSuccess((await response).token));
    writeCookies('LoginToken', (await response).token);
  } catch (e) {
    dispatch(authSlice.actions.authError(e));
  }
};
export const userData = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(profileSlice.actions.profileStartLoading());
    const response = axios.get<Profile>(`${URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(profileSlice.actions.profileSuccess((await response).data));
  } catch (e) {
    dispatch(profileSlice.actions.profileError(e));
  }
};

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
