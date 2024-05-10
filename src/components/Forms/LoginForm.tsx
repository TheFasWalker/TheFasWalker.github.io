import { Field, Form, Formik } from 'formik';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/Button/Button';
import cl from './FormStyles.module.scss';
import { generateComandId } from '../helpers/generateComandId';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { validateField } from './helpers/validation';
import { Loader } from '../Loader/Loader';
import { selectMemoizedAutorizationState } from 'src/store/memo/selectMemoizedAutorizationState';
import { errorMessages } from 'src/models/ServerErrors';
import { autorisation } from 'src/store/redusers/Actions/autorisationAction';
import { registration } from 'src/store/redusers/Actions/registrationAcrion';
// import { loginData } from 'src/helpers/fakeLoginData';

type loginFormProps = {
  close?: () => void;
};

export const LoginForm: FC<loginFormProps> = ({ close }) => {
  const [loginType, setLoginType] = useState(false);
  const { error: authError, isLoading: authLoading } = useAppSelector((state) => state.authReduser);
  const dispatch = useAppDispatch();
  const tokenData = useAppSelector(selectMemoizedAutorizationState);
  const changeFormType = () => {
    setLoginType(!loginType);
  };
  const registrationFunc = (email: string, password: string) => {
    const commandId = generateComandId(15);
    dispatch(registration(email, password, commandId));
  };

  const logIn = (email: string, password: string) => {
    dispatch(autorisation(email, password));
  };
  const memoizedClose = useCallback(() => {
    if (tokenData !== '') {
      close();
    }
  }, [tokenData]);
  useEffect(() => {
    memoizedClose();
  }, [tokenData, memoizedClose]);

  return (
    <>
      {authLoading && <Loader />}
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        onSubmit={(values) => {
          if (loginType) {
            registrationFunc(values.userName, values.password);
          } else {
            logIn(values.userName, values.password);
            // logIn(loginData.login, loginData.password);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className={cl.form}>
            <h2>Форма {loginType ? 'регистрации' : 'входа'}</h2>
            {authError && <span>{errorMessages[authError] ? errorMessages[authError] : 'Неизвестная ошибка'}</span>}
            <label className={cl.label}>
              <span>Почта для {loginType ? 'регистрации' : 'входа'}</span>
              <Field
                className={cl.input}
                name="userName"
                type="email"
                placeholder="email@email.email"
                validate={validateField}
              />
              {errors.userName && touched.userName && <div className={cl.error}>{errors.userName}</div>}
            </label>

            <label className={cl.label}>
              <span>Пароль для {loginType ? 'регистрации' : 'входа'}</span>
              <Field
                className={cl.input}
                name="password"
                type="password"
                placeholder="password"
                validate={validateField}
              />
              {errors.password && touched.password && <div className={cl.error}>{errors.password}</div>}
            </label>

            <Button buttonType="submit" elementClass={cl.button}>
              {loginType ? 'зарегистрироваться' : 'Войти'}
            </Button>

            <button className={cl.formType} onClick={() => changeFormType()} type="button">
              {loginType ? 'Войти' : 'зарегистрироваться'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
