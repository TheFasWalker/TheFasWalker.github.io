import { Field, Form, Formik } from "formik";
import { method } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "src/client/fetch";
import { Filters, fetchDataFromServer } from "src/client/types";
import { Button } from "src/components/button/Button";

import { Layout } from "src/components/lauout/Layout";
import { RootState } from "src/store";


export const ProfilePage = () => {
    const token = useSelector((state: RootState) => state.auth.login);
    const dispatch = useDispatch();
    let categoties:any
    function validateField(value: string) {
        if (!value) {
          return 'required';
        }
    }
    const createCategory = (categoryName: string) => {
        const data = {
            name:categoryName
        }
        fetchData('/categories', {
            method:'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((res) => {
            dispatch({ type: 'error', payload: res })
            console.log(res)
        })
        .catch(e=>console.log(e))
    }
    const getCategories = () => {
        fetchData<fetchDataFromServer>('/categories', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({ type: 'error', payload: res })
            console.log(res.data)
            // categoties = res
        })
            .catch(e => console.log(e))
    }

    return (
        <>
            <Layout>

                <button onClick={() => getCategories()}>get categories</button>
                <button onClick={()=>console.log(categoties)}>categories</button>
            </Layout>

        </>
    )
}