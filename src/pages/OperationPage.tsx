import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchData } from 'src/client/fetch';
import { Button } from 'src/components/button/Button';
import { Layout } from 'src/components/lauout/Layout';
import { RootState } from 'src/store';
import { removeOperation } from 'src/store/dataSlise';

export const OperationPage = () => {
  const dispatch = useDispatch();
  const operations = useSelector((state: RootState) => state.data);
  const { id } = useParams();
  const operationData = operations.filter((elem) => elem.id === id);
  const token = useSelector((state:RootState)=>state.auth.login)
  // console.log(operationData[0].id)
console.log('TOKEN = ' + token)


  const deleteOperation = (id: string) => {
    console.log(id)
    dispatch(removeOperation({ id:id }));

    fetchData(`/operations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      dispatch({type:'error',payload:res})
    }).catch(e=>console.log(e))
  };
  if (operationData) {
    return (
      <>
        <Layout>
          <div className="operation-wrapper" style={{display:'flex', gap:20,flexDirection:'column'}}>
            <div className="operation__section">
              <span>Название операции:</span>
              {/* <span> {operationData[0].name}</span> */}
            </div>
            <div className="operation__section">
              <span>Описание операции: </span>
              {/* <span>{operationData[0].desc}</span> */}
            </div>
            <div className="operation__section">
              <span>Тип операции: </span>
              {/* <span>{operationData[0].type}</span> */}
            </div>
            <div className="operation__section">
              <span>Дата операции: </span>
              {/* <span>{operationData[0].date}</span> */}
            </div>
            <div className="operation-buttons" style={{ gap: 20, display:'flex'}}>
              <Button onClick={() => deleteOperation(operationData[0].id)}> Delete operation</Button>
              <Button type="header"> EditOperation</Button>
            </div>
           </div>
        </Layout>
      </>
    );
  } else {
    return <Navigate to="/operations" />;
  }
};
