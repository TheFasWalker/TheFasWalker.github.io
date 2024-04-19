import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import cl from './form.module.scss';
import { useDispatch } from 'react-redux';
import { addOperartion } from 'src/store/dataSlise';




export type Props = {
  redirectFunc:()=>void
}
export const CreatingOperationForm:FC<Props> = ({redirectFunc}) => {
  const dispatch = useDispatch();
  function submitForm(values: any) {
    const date = new Date();
    values.operationId = date.toString();
    values.createdAt = date.getTime.toString();
    dispatch(addOperartion(values));
    console.log('submit')
    redirectFunc()
  }

  function validateField(value: string) {
    if (!value) {
      return 'required';
    }
  }

  return (
    <Formik
      initialValues={{
        operationName: '',
        createdAt: '',
        category: '',
        total: '',
        description: '',
        operationId: '',
      }}
      onSubmit={(values) => {
        submitForm(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={cl.formWrapper}>
          <label className={cl.label}>
            <span>Имя операции</span>
            <Field name="operationName" validate={validateField} />
            {errors.operationName && touched.operationName && <div className={cl.error}>{errors.operationName}</div>}
          </label>
          <label className={cl.label}>
            <span>название операции</span>

            <Field name="dateOperation" type="date" validate={validateField} />
            {errors.createdAt && touched.createdAt && <div className={cl.error}>{errors.createdAt}</div>}
          </label>
          <label className={cl.label}>
            <span>Категория</span>
            <Field name="category" type="text" validate={validateField} />
            {errors.category && touched.category && <div className={cl.error}>{errors.category}</div>}
          </label>
          <label className={cl.label}>
            <span>сумма операции</span>
            <Field name="total" type="number" validate={validateField} />
            {errors.total && touched.total && <div className={cl.error}>{errors.total}</div>}
          </label>
          <label className={cl.label}>
            <span>Описание</span>
            <Field name="description" type="text" validate={validateField} />
            {errors.total && touched.total && <div className={cl.error}>{errors.total}</div>}
          </label>
          <button className={cl.button} type="submit">
            save
          </button>
        </Form>
      )}
    </Formik>
  );
};


