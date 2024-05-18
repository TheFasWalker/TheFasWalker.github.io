import { createSlice } from '@reduxjs/toolkit';
import { ServerErrors } from 'src/models/ServerErrors';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthResult } from 'src/models/AuthResult';

interface authState {
  token: string;
  isLoading: boolean;
  error: string;
  commandId: string;
}
const initialState: authState = {
  token: '',
  isLoading: false,
  error: '',
  commandId: '',
};
interface loginWithCookies {
  token: string;
  commandId: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authWithCookies(state, action: PayloadAction<loginWithCookies>) {
      state.token = action.payload.token;
      state.commandId = action.payload.commandId;
    },
    authLogOut(state) {
      state.token = '';
      state.commandId = '';
    },
    auth(state) {
      state.isLoading = true;
    },
    authSuccess(state, action: PayloadAction<AuthResult>) {
      state.token = action.payload.token;
      state.isLoading = false;
      state.commandId = action.payload.profile.commandId;
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
