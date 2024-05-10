import React, { FC, useEffect } from 'react';
import cl from './FormStyles.module.scss';
import { Field, Form, Formik } from 'formik';
import { validateField } from './helpers/validation';
import { ButtonSubmit } from '../ui/Button/ButtonSubmit';
import { ButtonExit } from '../ui/Button/ButtonExit';
import { Operation } from 'src/models/IOperation';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { editOperaton } from 'src/store/redusers/Actions/operationsActions';
import { getCategories } from 'src/store/redusers/Actions/categoryActions';

type editOperationProps = {
  closeEdition: () => void;
  operation: Operation;
};
export const EditOperation: FC<editOperationProps> = ({ closeEdition, operation }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReduser.token);
  const { data: categories } = useAppSelector((state) => state.categoryReduser);
  useEffect(() => {
    dispatch(getCategories(token));
  });
  return (
    <>
      <Formik
        initialValues={{
          name: `${operation.name}`,
          desc: `${operation.desc}`,
          amount: `${operation.amount}`,
          type: `${operation.type}`,
          categoryId: `${operation.category.id}`,
        }}
        onSubmit={(values) => {
          const date = new Date().toISOString();
          const data = {
            name: values.name,
            desc: values.desc,
            amount: Number(values.amount),
            type: values.type,
            categoryId: values.categoryId,
            date: date,
          };

          dispatch(editOperaton(token, operation.id, data));
          closeEdition();
        }}
      >
        {({ errors, touched }) => (
          <Form className={cl.form}>
            <h2>Изменение операции</h2>

            <label className={cl.label}>
              <span>Название</span>
              <Field className={cl.input} placeholder="operationName" name="name" validate={validateField} />
              {errors.name && touched.name && <div className={cl.error}>{errors.name}</div>}
            </label>

            <label className={cl.label}>
              <span>Описание </span>
              <Field
                className={cl.input}
                placeholder="operationDescription"
                type="textfield"
                name="desc"
                validate={validateField}
              />
            </label>

            <label className={cl.label}>
              <span>Тип операции</span>
              <Field name="type" as="select">
                <option value="Profit">Profit</option>
                <option value="Cost">Cost</option>
              </Field>
            </label>
            <label className={cl.label}>
              <span>Количество</span>
              <Field className={cl.input} placeholder="amount" name="amount" validate={validateField} />
              {errors.amount && touched.amount && <div className={cl.error}>{errors.amount}</div>}
            </label>
            <label className={cl.label}>
              <span>Категория операции</span>
              <Field name="categoryId" as="select" validate={validateField}>
                {categories.data.map((categoty) => (
                  <option key={categoty.id} value={categoty.id}>
                    {categoty.name}
                  </option>
                ))}
              </Field>
              {errors.categoryId && touched.categoryId && <div className={cl.error}>{errors.categoryId}</div>}
            </label>
            <div className={cl.buttonsFooter}>
              <ButtonSubmit />
              <ButtonExit type="button" onClick={() => closeEdition()} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
