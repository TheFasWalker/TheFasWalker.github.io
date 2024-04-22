import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect } from 'react';
import cl from './form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addOperartion } from 'src/store/dataSlise';
import { fetchData } from 'src/client/fetch';
import { RootState } from 'src/store';
import { Params, Params2 } from 'src/client/types';




export type Props = {
  redirectFunc:()=>void
}


export const CreatingOperationForm: FC<Props> = ({ redirectFunc }) => {
  const token = useSelector((state: RootState) => state.auth.login)

  const dispatch = useDispatch();

  function submitForm(values: any) {
    const data = {
      name: values.name.toString() ,
      desc: values.desc.toString(),
      amount:values.amount,
      date:new Date().toISOString(),
      type:values.type,
      categoryId:values.categoryId
    }
    console.log(data)
    fetchData('/operations', {
      method: 'POST',
      headers:{
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(data)
    }).catch(e=>console.log(e))


    // redirectFunc()
  }

  function validateField(value: string) {
    if (!value) {
      return 'required';

    }
  }
  const getCategorise = () => {
    const data = {
      name: 'Profit',
    }
    fetchData('/categories', {
      method:'POST',
      headers:{
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(data)
    }).then((res) => {
      dispatch({ type: 'error', payload: res })
      console.log(res)
    }).catch(e=>console.log(e))

  }
  useEffect(() => {
    // getCategorise()
 },[])
  return (
    <Formik
      initialValues={{
        name: '',
        desc: '',
        amount: '1',
        type: 'Profit',
        categoryId:''
      }}
      onSubmit={(values) => {
        submitForm(values);
        // redirectFunc()

        console.log('submit')
      }}
    >
      {({ errors, touched }) => (
        <Form className={cl.formWrapper}>
          <label className={cl.label}>
            <span>Имя операции</span>
            <Field name="name" validate={validateField} />
            {errors.name && touched.name && <div className={cl.error}>{errors.name}</div>}
          </label>
          <label className={cl.label}>
            <span>Описание</span>
            <Field name="desc" validate={validateField} />
            {errors.desc && touched.desc && <div className={cl.error}>{errors.desc}</div>}
          </label>
          <label className={cl.label}>
            <span>количество</span>
            <Field name="amount" validate={validateField} type="number"/>
            {errors.amount && touched.amount && <div className={cl.error}>{errors.amount}</div>}
          </label>
            <label>
              <Field type="radio" name="type" value="Profit" />
              Profit
          </label>
          <label>
              <Field type="radio" name="type" value="Cost" />
              Cost
          </label>
          <label className={cl.label}>
            <span>Категория</span>
            <Field name="categoryId" validate={validateField} />
            {/* {errors.categoryId && touched.categoryId && <div className={cl.error}>{errors.categoryId}</div>} */}
          </label>
          <button className={cl.button} type="submit">
            save
          </button>
        </Form>
      )}
    </Formik>
  );
};


