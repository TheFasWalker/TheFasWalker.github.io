import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import cl from './FormStyles.module.scss';
import { ButtonSubmit } from '../ui/Button/ButtonSubmit';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { userDataEdit } from 'src/store/redusers/Actions/UserActions';
import { errorMessages } from 'src/models/ServerErrors';
import { validateUserName } from './helpers/validation';

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
        {({errors}) => (
          <Form className={cl.editdata}>
            <label>
              <Field
                placeholder="Ваше имя"
                name="name"
                validate={validateUserName}
              />
              {errors.name && <div className={cl.error}>{errors.name}</div>}
            </label>
            <ButtonSubmit />
          </Form>
        )}
      </Formik>
    </>
  );
};
