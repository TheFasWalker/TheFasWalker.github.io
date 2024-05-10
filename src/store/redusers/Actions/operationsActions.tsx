import axios from 'axios';
import { IOperation, Operation, OperationCreate } from 'src/models/Operation';
import { operationsSlice } from '../operationsSlice';
import { AppDispatch } from 'src/store/store';
import { URL } from 'src/client/config';

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

export const getSortedOperationsWithPagination =
  (ItemPerPage: number, activePage: number, sottingType: string) => async (dispatch: AppDispatch) => {
    const searchParams = new URLSearchParams({
      pagination: JSON.stringify({
        pageSize: ItemPerPage,
        pageNumber: activePage,
      }),
      sorting: JSON.stringify({ type: sottingType, field: 'name' }),
    }).toString();

    try {
      dispatch(operationsSlice.actions.operationsFetching());
      const response = axios.get<IOperation>(`${URL}/operations?${searchParams}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log((await response).data);
      dispatch(operationsSlice.actions.operationsFetchingSuccess((await response).data));
    } catch (e) {
      dispatch(operationsSlice.actions.operationsFetchingError(e.message));
    }
  };
