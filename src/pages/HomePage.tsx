import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from "src/components/lauout/Layout";
import { RootState } from 'src/store';
import { CategoryItem, fetchCategoriesFromServer, fetchDataFromServer } from 'src/client/types';
import { fetchData } from 'src/client/fetch';

export const HomePage = () => {
// ===================
const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.login);

  const [categoties, setCategories] = useState<CategoryItem[]>([])



  useEffect(() => {
    const getCategories = () => {
      fetchData<fetchCategoriesFromServer>('/categories', {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
          }
      })
      .then((res) => {
        dispatch({ type: 'error', payload: res })
      setCategories(res.data)
      }).catch(e => console.log(e))
    }
    getCategories()
    console.log(categoties)
},[])




//==================
    return (
        <>
            <Layout>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos officiis, ut accusamus, velit aut eos quis optio libero maxime dicta ea laboriosam necessitatibus incidunt voluptatibus voluptate ad? Magnam veritatis eveniet quo culpa sapiente eum porro nemo, vero quae, quas voluptates dolores. Doloribus voluptate, quis sed facere delectus beatae. Enim, ducimus.


            </Layout>

        </>
    )
}