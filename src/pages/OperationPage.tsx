import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchData } from 'src/client/fetch';
import { Operations } from 'src/client/types';
import { Button } from 'src/components/button/Button';
import { Layout } from 'src/components/lauout/Layout';
import { RootState } from 'src/store';
import { removeOperation } from 'src/store/dataSlise';

export const OperationPage = () => {
  const dispatch = useDispatch();
  const operations = useSelector((state: RootState) => state.data);
  const { id } = useParams();
  let operationData = operations.filter((elem) => elem.id === id);
  const token = useSelector((state: RootState) => state.auth.login)

  const getSingleOperation = (id: string) => {
    fetchData<Operations>(`/operations/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch({
        type: 'error', payload: res
      })
    }).catch(e=>console.log(e))
  }
  const deleteOperation = (id:string) => {
    dispatch(removeOperation({ id: id }))
    fetchData(`/operations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch({type:'error', payload:res})
    }).catch(e=>console.log(e))
  }


  if (operationData[0]) {
    return (
      <>
        <Layout>
          <div className="operation-wrapper">
            <div className="operation__section">
              <span>Название операции:</span>
              <span> {operationData[0].name}</span>
            </div>
            <div className="operation__section">
              <span>Описание операции:</span>
              <p>{operationData[0].desc}</p>
            </div>
            <div className="operation-buttons">
              <Button onClick={() => deleteOperation(operationData[0].id)}> Delete operation</Button>
              {/* <Button type="header"> EditOperation</Button> */}
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return <Navigate to="/operations" />;
  }
};
