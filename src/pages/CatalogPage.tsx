import React, { useEffect, useState } from 'react';
import { Loader } from 'src/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { deleteOperationById, fetchOperations } from 'src/store/redusers/ActionCreater';
import { ButtonSorting } from 'src/components/ui/Button/ButtonSorting';
import { Button } from 'src/components/ui/Button/Button';
import { OperationPreview } from 'src/components/OperationPreview/OperationPreview';
import { selectMemoizedAutorizationState } from 'src/store/memo/selectMemoizedAutorizationState';
import { PopupWrapper } from 'src/components/PopupWrapper/PopupWrapper';
import { CreateOperationForm } from 'src/components/Forms/CreateOperationForm';

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, operations } = useAppSelector((state) => state.operationsReduser);
  const token = useAppSelector(selectMemoizedAutorizationState);
  const [ctreateOperationPopuState, setCtreateOperationPopuState] = useState(false);

  useEffect(() => {
    dispatch(fetchOperations(token));
  }, []);

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
            <ButtonSorting
              onClickEvent={() => console.log('sss')}
              // activity={true}
            >
              get data
            </ButtonSorting>
            <ButtonSorting
              onClickEvent={() => console.log('token')}
              // activity={true}
            >
              sorting type 2
            </ButtonSorting>
          </div>
        </header>
        <div className="content operationContent">
          {isLoading && <Loader />}
          {error && <span>Ошибка загрузки данных</span>}
          {operations.data.length == 0 ? (
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