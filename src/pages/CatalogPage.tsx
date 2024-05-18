import React, { useEffect, useState } from 'react';
import { Loader } from 'src/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';

import { Button } from 'src/components/ui/Button/Button';
import { OperationPreview } from 'src/components/OperationPreview/OperationPreview';
import { selectMemoizedAutorizationState } from 'src/store/memo/selectMemoizedAutorizationState';
import { PopupWrapper } from 'src/components/PopupWrapper/PopupWrapper';
import { CreateOperationForm } from 'src/components/Forms/CreateOperationForm';
import { fetchOperations, deleteOperationById } from 'src/store/redusers/Actions/operationsActions';

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, operations } = useAppSelector((state) => state.operationsReduser);
  const token = useAppSelector(selectMemoizedAutorizationState);
  const [ctreateOperationPopuState, setCtreateOperationPopuState] = useState(false);

  useEffect(() => {
    dispatch(fetchOperations(token));
  }, [dispatch, token]);

  return (
    <>
      <div className="container">
        <header className="catalogHeader">
          <h1>catalog page</h1>
          <div className="catalogSorting">
            {token != '' ? (
              <Button onClick={() => setCtreateOperationPopuState(!ctreateOperationPopuState)}>Create Operation</Button>
            ) : null}
          </div>
        </header>
        <div className="content operationContent">
          {isLoading && <Loader />}
          {error && <span>Ошибка загрузки данных</span>}
          {operations.data.length == 0 && token != '' ? (
            <div className="noOperations">
              <h2>у вас еще нет операций</h2>
              <Button onClick={() => setCtreateOperationPopuState(!ctreateOperationPopuState)}>
                Создать операцию?
              </Button>
            </div>
          ) : (
            <>
              {operations.data.map((operation) => (
                <OperationPreview
                  key={operation.id}
                  name={operation.name}
                  desc={operation.desc}
                  amount={operation.amount}
                  id={operation.id}
                  commandId={operation.commandId}
                  deleteFunc={() => dispatch(deleteOperationById(token, operation.id))}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <PopupWrapper
        visible={ctreateOperationPopuState}
        close={() => setCtreateOperationPopuState(!ctreateOperationPopuState)}
      >
        <CreateOperationForm token={token} closeFunc={() => setCtreateOperationPopuState(!ctreateOperationPopuState)} />
      </PopupWrapper>
    </>
  );
};
