import React, { FC } from 'react';
import cl from './OperationsDetail.module.scss';
import { PopupWrapper } from '../PopupWrapper/PopupWrapper';
import { EditButton } from '../ui/Button/EditButton';
import { DeleteButton } from '../ui/Button/DeleteButton';
import { useAppSelector } from 'src/hooks/redux';

import { EditOperation } from '../Forms/EditOperation';

type operationDetailsProps = {
  id: string;
  close: () => void;
  visible: boolean;
  deleteElem: () => void;
  closeFormVisibility: () => void;
  editFormVisibility: boolean;
  openFormVisibility: () => void;
  token: string;
};

export const OperationsDetail: FC<operationDetailsProps> = ({
  token,
  id,
  close,
  visible,
  deleteElem,
  editFormVisibility,
  openFormVisibility,
  closeFormVisibility,
}) => {
  const deleteItem = () => {
    deleteElem();
    close();
  };

  const operations = useAppSelector((state) => state.operationsReduser.operations.data);
  const operationElement = operations.find((elem) => elem.id == id);

  return (
    <PopupWrapper visible={visible} close={() => close()}>
      {editFormVisibility ? (
        <div className={cl.operation}>
          <h2>Просмотр операции</h2>
          <div className={cl.operationSection}>
            <span>Название операции:</span>
            <span>{operationElement.name}</span>
          </div>

          <div className={cl.operationSection}>
            <span>Описание операции:</span>
            <span>{operationElement.desc}</span>
          </div>
          <div className={cl.operationSection}>
            <span>Количество:</span>
            <span>{operationElement.amount}</span>
          </div>
          <div className={cl.operationSection}>
            <span>Категория операции:</span>
            {operationElement.category ? (
              <span>{operationElement.category.name}</span>
            ) : (
              <span>Категория не задана</span>
            )}
          </div>

          <div className={cl.operationSectionDate}>
            <span>Cоздания операции:</span>
            <span>{operationElement.createdAt}</span>
          </div>
          <div className={cl.operationSectionDate}>
            <span>Обновления операции:</span>
            <span>{operationElement.createdAt}</span>
          </div>
          {token && (
            <div className={cl.buttons}>
              <DeleteButton onClick={() => deleteItem()} />
              <EditButton onClick={() => openFormVisibility()} />
            </div>
          )}
        </div>
      ) : (
        <EditOperation operation={operationElement} closeEdition={() => closeFormVisibility()} />
      )}
    </PopupWrapper>
  );
};
