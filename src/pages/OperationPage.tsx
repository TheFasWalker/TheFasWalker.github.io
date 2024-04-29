import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchData } from 'src/client/fetch';
import { Operation } from 'src/client/types';
import { Button } from 'src/components/button/Button';
import { Layout } from 'src/components/lauout/Layout';
import { RootState } from 'src/store';


export const OperationPage = () => {
  const token =useSelector((state: RootState) => state.auth.login);
  const { id } = useParams();
  const [operationData, setOperationData] = useState<Operation>()
  const [isLoaded, setIsLoaded] = useState(false);

  const getSingleOperation = () => {

    fetchData<Operation>(`/operations/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setIsLoaded(true);
      setOperationData(res)
    }).catch(e => console.log(e))
  }
  const deleteOperationById = () => {
    fetchData(`/operations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log(res);
      return <Navigate to="/operations" />;
    })
    .catch(e=>console.log(e))
  }

  useEffect(() => {
    console.log('single page ')
    getSingleOperation()
  }, [])

  if (!isLoaded) {
    return <h1> loading</h1>
  }else{
    return (
      <>
        <Layout>
          <div className="operation-wrapper">
            <div className="operation__section">
              <span>Название операции:</span>
              <span> {operationData.name}</span>
            </div>
            {}
            <div className="operation__section">
              <span>Описание операции:</span>
              <p>{operationData.desc ? operationData.desc : ' Описание отсутствует'}</p>
            </div>
            <div className="operation-buttons">
              <Button onClick={() => deleteOperationById()}> Delete operation</Button>
            </div>
          </div>
        </Layout>
      </>
    )
  }
};
