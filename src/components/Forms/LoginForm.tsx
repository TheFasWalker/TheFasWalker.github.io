import { Field, Form, Formik } from 'formik';
import React, { FC, ReactEventHandler, useEffect, useState } from 'react';
import { Button } from '../ui/Button/Button';
import cl from './LoginForm.module.scss';
import { fetchData } from 'src/client/fetch';
import { AuthResult } from 'src/client/types';
import { generateComandId } from '../helpers/generateComandId';
import { getCookie, writeCookies } from '../helpers/cookies';
import { useDispatch } from 'react-redux';
import { authLogIn } from '../../store/authSlise';
import { error } from 'console';


const loginData = {
  'login': 'test42@test42.test',
  'password': 'qwerasdf1'
}


type loginFormProps = {
  close?:()=>void
};

export const LoginForm: FC<loginFormProps> = ({ close }) => {
  const [loginType, setLoginType] = useState(false);
  const dispatch = useDispatch();

  function validateField(value: string) {
    // if (!value) {
    //   return 'Заполните поле';
    // }
  }


  const registration = (email: string, password: string) => {
    const commandId = generateComandId(15);
    const data = {
      email: email,
      password: password,
      commandId: commandId,
    };
    console.log(data);
    console.log('registration');
    // fetchData<AuthResult>('/signup', {
    //   method: 'POST',
    //   headers:{
    //     'Content-Type': 'application/json',
    //   },
    //   body:JSON.stringify(data)
    // }).then((res) => {
    //   console.log(res.token)
    //   writeCookies('LoginToken', res.token)

    // }).catch(e=>console.log(e))
    writeCookies('LoginToken', generateComandId(15));
  };

  const logIn = (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };
    fetchData<AuthResult>('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    }).then((res) => {
      console.log('good')
      console.log(res)
      // writeCookies('LoginToken', res.token)
      // dispatch(authLogIn(getCookie('LoginToken')));
      // close()
    }).catch(e=>console.log(e))



  };

  return (
    <Formik
      initialValues={{
        userName: '',
        password: '',
      }}
      onSubmit={(values) => {

        if (loginType) {
          registration(values.userName, values.password);
        } else {
          // logIn(values.userName, values.password);
          logIn(loginData.login,loginData.password)
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className={cl.form}>
          <h2>Форма {loginType ? 'регистрации' : 'входа'}</h2>

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

          <button className={cl.formType} onClick={() => setLoginType(!loginType)} type="button">
            {loginType ? 'Войти' : 'зарегистрироваться'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
