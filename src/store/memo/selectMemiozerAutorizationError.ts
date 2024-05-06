import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const autorizationErrorState = (state: RootState) => state.authReduser.error;

export const selectMemiozerAutorizationError = createSelector(autorizationErrorState, (error) => error);
