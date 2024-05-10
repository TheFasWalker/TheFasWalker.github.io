import React, { useEffect, useState } from 'react';
import cl from './Header.module.scss';
import { Button } from '../ui/Button/Button';
import cn from 'classnames';
import { PopupWrapper } from '../PopupWrapper/PopupWrapper';
import { LoginForm } from '../Forms/LoginForm';
import { NavLink } from 'react-router-dom';
import { getCookie, writeCookies } from '../helpers/cookies';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { authSlice } from 'src/store/redusers/authSlice';

export const Header = () => {
  const dispatch = useAppDispatch();

  const [popupState, setPopupState] = useState(false);
  const authState = useAppSelector((state) => state.authReduser.token);

  const closePopupForm = () => {
    setPopupState(!popupState);
    dispatch(authSlice.actions.authCleanErrors());
  };

  const logOut = () => {
    dispatch(authSlice.actions.authLogOut());
    writeCookies('LoginToken', '');
  };

  useEffect(() => {
    if (getCookie('LoginToken')) {
      dispatch(authSlice.actions.authWithCookies(getCookie('LoginToken')));
    }
    if (authState != '') {
      writeCookies('LoginToken', authState);
    }
  }, []);
  return (
    <>
      <header className={cl.header}>
        <div className={cn('container', cl.container)}>
          <NavLink className={cl.logo} to="/">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className={cl.mouth}
                d="M35.6689 16.819H4.28623C3.62872 16.819 3.09179 17.3764 3.15209 18.0343C3.84119 25.8488 11.1112 31.9999 19.9776 31.9999C28.844 31.9999 36.1139 25.8517 36.803 18.0343C36.8605 17.3764 36.3264 16.819 35.6689 16.819Z"
              />
              <path
                className={cl.eye}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.225147 3.33137C1.7887 1.27854 4.60645 0 7.711 0C10.8155 0 13.6333 1.27854 15.1969 3.33137C15.5659 3.81589 15.4714 4.50716 14.9858 4.87537C14.5001 5.24357 13.8073 5.14928 13.4383 4.66476C12.3661 3.25707 10.2569 2.20377 7.711 2.20377C5.16509 2.20377 3.05591 3.25707 1.98374 4.66476C1.6147 5.14928 0.921857 5.24357 0.436236 4.87537C-0.0493858 4.50716 -0.143894 3.81589 0.225147 3.33137Z"
              />
              <path
                className={cl.eye}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.7671 3.33137C26.3307 1.27854 29.1484 0 32.253 0C35.3552 0 38.1721 1.27884 39.7381 3.33045C40.1077 3.81458 40.0139 4.50596 39.5287 4.87467C39.0434 5.24338 38.3505 5.14981 37.981 4.66568C36.9055 3.25676 34.7955 2.20377 32.253 2.20377C29.7071 2.20377 27.5979 3.25707 26.5257 4.66476C26.1567 5.14928 25.4638 5.24357 24.9782 4.87537C24.4926 4.50716 24.3981 3.81589 24.7671 3.33137Z"
              />
            </svg>
          </NavLink>
          <nav className={cl.navigation}>
            <NavLink className={cl.navItem} to="/catalog">
              Каталог
            </NavLink>
            <NavLink className={cl.navItem} to="/pagination">
              Страница с пагинацией
            </NavLink>
            {!authState || (
              <NavLink className={cl.navItem} to="/profile">
                профиль
              </NavLink>
            )}
          </nav>
          {!authState ? (
            <Button onClick={() => setPopupState(!popupState)} elementClass={cl.logIn}>
              LogIn
            </Button>
          ) : (
            <Button onClick={() => logOut()} elementClass={cl.logIn}>
              LogOut
            </Button>
          )}
        </div>
      </header>

      <PopupWrapper close={() => closePopupForm()} visible={popupState}>
        <LoginForm close={() => closePopupForm()} />
      </PopupWrapper>
    </>
  );
};
