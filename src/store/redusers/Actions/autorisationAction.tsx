import { fetchData } from 'src/client/fetch';
import { authSlice } from '../authSlice';
import { AuthResult } from 'src/models/AuthResult';
import { writeCookies } from 'src/components/helpers/cookies';
import { AppDispatch } from 'src/store/store';

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
    dispatch(authSlice.actions.authSuccess(await response));
    writeCookies('LoginToken', (await response).token);
    writeCookies('commandId', (await response).profile.commandId);
  } catch (e) {
    dispatch(authSlice.actions.authError(e));
  }
};
