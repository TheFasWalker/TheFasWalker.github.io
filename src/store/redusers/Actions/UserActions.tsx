import { profileSlice } from '../userDataSlice';
import { Profile } from 'src/models/userData';
import { fetchData } from 'src/client/fetch';
import { AppDispatch } from 'src/store/store';

export const userData = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(profileSlice.actions.profileStartLoading());
    const response = fetchData<Profile>(`/profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(profileSlice.actions.profileSuccess(await response));
console.log((await response))
  } catch (e) {
    dispatch(profileSlice.actions.profileError(e));
  }
};
export const userDataEdit = (token: string, name?: string) => async (dispatch: AppDispatch) => {
  const data = {
    name: name,
  };
  try {
    dispatch(profileSlice.actions.profileStartLoading());
    const response = fetchData<Profile>('/profile', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log((await response))
    dispatch(profileSlice.actions.profileSuccess(await response));
  } catch (e) {
    dispatch(profileSlice.actions.profileError(e));
  }
};
