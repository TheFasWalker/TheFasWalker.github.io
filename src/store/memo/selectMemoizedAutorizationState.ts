import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';


const autorizationState = (state: RootState) => state.authReduser.token;

export const selectMemoizedAutorizationState = createSelector(
    autorizationState,
    (token) => token
);