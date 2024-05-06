import { createSlice } from '@reduxjs/toolkit';
import { ServerErrors } from 'src/models/ServerErrors';
import type { PayloadAction } from '@reduxjs/toolkit';

interface authState {
  token: string;
  isLoading: boolean;
  error: string;
}
const initialState: authState = {
  token: '',
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authWithCookies(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    authLogOut(state) {
      state.token = '';
    },
    auth(state) {
      state.isLoading = true;
    },
    authSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isLoading = false;
    },
    authError(state, action: PayloadAction<ServerErrors>) {
      state.isLoading = false;
      state.error = action.payload.errors[0].extensions.code;
    },
    authCleanErrors(state) {
      state.error = '';
    },
  },
});
export default authSlice.reducer;
