import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from 'src/components/button/Button';
import { Layout } from 'src/components/lauout/Layout';
import { RootState } from 'src/store';
import { removeOperation } from 'src/store/dataSlise';

export const OperationPage = () => {
  const dispatch = useDispatch();
  const operations = useSelector((state: RootState) => state.data);
  const { id } = useParams();
  const operationData = operations.filter((elem) => elem.operationId === id);

  const deleteOperation = (operationId: string) => {
    dispatch(removeOperation({ operationId }));
  };
  if (operationData[0]) {
    return (
      <>
        <Layout>
          <div className="operation-wrapper">
            <div className="operation__section">
              <span>Название операции:</span>
              <span> {operationData[0].operationName}</span>
            </div>
            <div className="operation__section">
              <span>Описание операции:</span>
              <p>{operationData[0].description}</p>
            </div>
            <div className="operation-buttons">
              <Button onClick={() => deleteOperation(operationData[0].operationId)}> Delete operation</Button>
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
