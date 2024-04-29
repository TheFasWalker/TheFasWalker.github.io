import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import cl from './form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addOperartion } from 'src/store/dataSlise';
import { RootState } from 'src/store';
import { fetchData } from 'src/client/fetch';
import { Category, fetchCategories } from 'src/client/types';

import Select from 'react-select';




export type Props = {
  redirectFunc:()=>void
}
export const CreatingOperationForm: FC<Props> = ({ redirectFunc }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.login);
  const [categoriesArray,setCategoriesArray]=useState<Category[]>([])


  const getCategories = () => {
    fetchData<fetchCategories>('/categories', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setCategoriesArray(res.data)
    }).catch(e=>console.log(e))
  }

  const submitForm = (values: any)=> {
    const date = new Date().toISOString();



    const data = {
      name: values.name,
      desc: values.desc,
      amount: values.amount,
      type:values.selectType,
      categoryId: values.categoryId,
      date : date,
    }
    console.log(data)
    fetchData('/operations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    }).then(res=> {
      console.log('asdaa')
    }).catch(e=>console.log(e))

  }

  const validateField=(value: string)=> {
    if (!value) {
      return 'required';
    }
  }

  const createCategory = (name: string, photo?: string) => {
    const data = {
      name: `${name}`,
      photo:`${photo}`
    }
    fetchData('/categories', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    }).then((res) => {
      console.log(res)
    }).catch(e=>console.log(e))
  }



  useEffect(() => {
    getCategories()

  },[])

  return (

    <Formik
      initialValues={{
        name: '',
        desc:'',
        amount: '',
        selectType: 'Profit',
        categoryId:''
      }}
      onSubmit={(values) => {
        submitForm(values);

      }}

    >

      {({ errors, touched}) => (
        <Form className={cl.formWrapper}>
          <label className={cl.label}>
            <span>Имя операции</span>
            <Field name="name" validate={validateField} />
            {errors.name && touched.name && <div className={cl.error}>{errors.name}</div>}
          </label>
          <label className={cl.label}>
            <span>описание операции</span>
            <Field name="desc" type="text" validate={validateField} />
            {errors.desc && touched.desc && <div className={cl.error}>{errors.desc}</div>}
          </label>

          <label className={cl.label}>
            <span>Стоимость</span>

            <Field name="amount" type="number" validate={validateField} />
            {errors.amount && touched.amount && <div className={cl.error}>{errors.desc}</div>}
          </label>

          <label htmlFor="selectType">Выберите опцию:</label>

           <Field name="selectType" as="select">
            <option value="Profit">Profit</option>
            <option value="Cost">Cost</option>
          </Field>

          <Field name="categoryId" as="select">
            {categoriesArray.map((category) => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
          </Field>





          {/* <select
            name='categoryIds'
          value=''>
            {categoriesArray.map((category) => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })
            }

        </select> */}
          <button className={cl.button} type="submit">
            save
          </button>
        </Form>
      )}
    </Formik>
  );
};


