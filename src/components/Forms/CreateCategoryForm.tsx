import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import cl from './LoginForm.module.scss';
import { Button } from '../ui/Button/Button';
import { useAppDispatch } from 'src/hooks/redux';
import { createCategorie } from 'src/store/redusers/ActionCreater';
import { validateField } from './helpers/validation';

type createCategoryProps = {
  close: () => void;
  token: string;
};
export const CreateCategoryForm: FC<createCategoryProps> = ({ close, token }) => {
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={(values) => {
        dispatch(createCategorie(token, values));
        close();
      }}
    >
      {({ errors, touched }) => (
        <Form className={cl.form}>
          <label>
            <span>Название категории</span>
            <Field className={cl.input} placeholder="название категории" name="name" validate={validateField} />
            {errors.name && touched.name && <div className={cl.error}>{errors.name}</div>}
          </label>
          <Button buttonType="submit">Создать категорию</Button>
        </Form>
      )}
    </Formik>
  );
};
