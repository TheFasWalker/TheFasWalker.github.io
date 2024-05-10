import { createSlice } from '@reduxjs/toolkit';
import { ServerErrors } from 'src/models/ServerErrors';
import type { PayloadAction } from '@reduxjs/toolkit';

type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
};

interface profileState {
  profile: {
    id: string;
    name: string;
    email: string;
    signUpDate: Date;
  };
  isLoading: boolean;
  error: string;
}
const initialState: profileState = {
  profile: {
    id: '',
    name: '',
    email: '',
    signUpDate: null,
  },
  isLoading: false,
  error: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileStartLoading(state) {
      state.isLoading = true;
    },
    profileSuccess(state, action: PayloadAction<Profile>) {
      state.isLoading = false;
      state.error = '';
      state.profile = action.payload;
    },
    profileError(state, action: PayloadAction<ServerErrors>) {
      state.isLoading = false;
      console.log(action.payload)
      state.error = action.payload.errors[0].extensions.code;
    },
  },
});
export default profileSlice.reducer;
