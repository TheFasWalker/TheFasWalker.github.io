import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';

import cl from './FormStyles.module.scss';
import { Button } from '../ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { validateField } from './helpers/validation';
import { crateOperation } from 'src/store/redusers/Actions/operationsActions';
import { getCategories } from 'src/store/redusers/Actions/categoryActions';

type CreateOperationForm = {
  token: string;
  closeFunc: () => void;
};

export const CreateOperationForm: FC<CreateOperationForm> = ({ token, closeFunc }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: categories } = useAppSelector((state) => state.categoryReduser);

  const createCategoryWithRedirect = () => {
    navigate('/profile?popup=true');
  };

  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  return (
    <>
      {categories.data.length ? (
        <Formik
          initialValues={{
            name: '',
            desc: '',
            amount: '',
            type: 'Profit',
            categoryId: '',
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
            dispatch(crateOperation(token, data));
            closeFunc();
          }}
        >
          {({ errors, touched }) => (
            <Form className={cl.form}>
              <h2>Создание формы</h2>

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
                  <option value="">Выберите категорию</option>
                  {categories.data.map((categoty) => (
                    <option key={categoty.id} value={categoty.id}>
                      {categoty.name}
                    </option>
                  ))}
                </Field>
                {errors.categoryId && touched.categoryId && <div className={cl.error}>{errors.categoryId}</div>}
              </label>
              <Button buttonType={'submit'}>Создать операцию</Button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className={cl.noCategpriesError}>
          <h2>Перед созданием операции создайте вашу категорию в профиле</h2>
          <Button onClick={() => createCategoryWithRedirect()}>Создать категорию</Button>
        </div>
      )}
    </>
  );
};
