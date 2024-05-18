import React, { FC, useState } from 'react';
import { Button } from 'src/components/ui/Button/Button';
import cl from './OperationPreview.module.scss';
import cn from 'classnames';
import { DeleteButton } from 'src/components/ui/Button/DeleteButton';
import { OperationsDetail } from '../OperationsDetail/OperationsDetail';
import { useAppSelector } from 'src/hooks/redux';

type Operation = {
  name: string;
  desc?: string;
  amount: number;
  id: string;
  deleteFunc?: () => void;
  commandId: string | null;
};

export const OperationPreview: FC<Operation> = ({ name, desc, amount, id, deleteFunc, commandId }) => {
  const [detatilsPopupState, setDetatilsPopupState] = useState<boolean>(false);
  const [editFormVisibility, setEditFormVisibility] = useState<boolean>(true);
  const token = useAppSelector((state) => state.authReduser.token);
  const userCommandId = useAppSelector((state) => state.authReduser.commandId) == commandId;
  const showOperationsWithElement = token != '' && userCommandId;
  const closePopup = () => {
    setDetatilsPopupState(!detatilsPopupState);
    setEditFormVisibility(true);
  };
  return (
    <>
      <div className={cl.operation}>
        <div className={cn(cl.operationData, cl.main)}>
          <span className={cl.operationTitle}>Название операции:</span>
          <span>{name}</span>
        </div>
        <div className={cn(cl.operationData, cl.desc)}>
          <span className={cl.operationTitle}>Описание операции:</span>
          <span>{desc ? desc : 'Описание отсутствует'}</span>
        </div>
        <div className={cl.operationData}>
          <span className={cl.operationTitle}>Стоимость операции:</span>
          <span>{amount}</span>
        </div>
        <div className={cl.operationButtons}>
          <Button onClick={() => setDetatilsPopupState(!detatilsPopupState)}>Подробнее</Button>
          {showOperationsWithElement ? <DeleteButton onClick={deleteFunc} /> : null}
        </div>
      </div>
      <OperationsDetail
        id={id}
        close={() => closePopup()}
        visible={detatilsPopupState}
        deleteElem={() => deleteFunc()}
        editFormVisibility={editFormVisibility}
        closeFormVisibility={() => setEditFormVisibility(true)}
        openFormVisibility={() => setEditFormVisibility(false)}
        token={token}
        visibilityElementActions={showOperationsWithElement}
      />
    </>
  );
};
