import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import cl from './LoginForm.module.scss';
import { ButtonSubmit } from '../ui/Button/ButtonSubmit';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { userDataEdit } from 'src/store/redusers/ActionCreater';
import { errorMessages } from 'src/models/ServerErrors';

type userEditPropsType = {
  profileData: {
    id: string;
    name: string;
    email: string;
    signUpDate: Date;
  };
};
export const UserDaraEdit: FC<userEditPropsType> = ({ profileData }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReduser.token);
  const { error } = useAppSelector((state) => state.profileReduser);
  const editUserData = (token: string, name: string) => {
    dispatch(userDataEdit(token, name));
  };
  return (
    <>
      {error && <span>{errorMessages[error] ? errorMessages[error] : 'неизвестная ошибка'}</span>}
      <Formik
        initialValues={{
          name: profileData.name,
        }}
        onSubmit={(values) => {
          editUserData(token, values.name);
        }}
      >
        {() => (
          <Form className={cl.editdata}>
            <label>
              <Field placeholder="Ваше имя" name="name" />
            </label>
            <ButtonSubmit />
          </Form>
        )}
      </Formik>
    </>
  );
};
