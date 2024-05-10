import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import cl from './FormStyles.module.scss';
import { validateField } from './helpers/validation';
import { ButtonSubmit } from '../ui/Button/ButtonSubmit';
import { ButtonExit } from '../ui/Button/ButtonExit';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { editCategory } from 'src/store/redusers/Actions/categoryActions';

type EditCategoryFornProps = {
  name: string;
  id: string;
  close: () => void;
};

export const EditCategoryForm: FC<EditCategoryFornProps> = ({ name, id, close }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReduser.token);

  return (
    <>
      <Formik
        initialValues={{
          name: `${name}`,
        }}
        onSubmit={(values) => {
          dispatch(editCategory(token, id, values));
          close();
        }}
      >
        {({ errors, touched }) => (
          <Form className={cl.editCategoryForm}>
            <label>
              <Field name="name" placeholder="название операции" validate={validateField} />
              {errors.name && touched.name && <div className={cl.error}>{errors.name}</div>}
            </label>
            <div className={cl.buttons}>
              <ButtonSubmit />
              <ButtonExit type="button" onClick={close} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
