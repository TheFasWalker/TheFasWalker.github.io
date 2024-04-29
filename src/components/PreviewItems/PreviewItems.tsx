import React, { FC } from 'react';
import styles from './PreviewItems.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Category, Operation } from 'src/client/types';



export type PreviewItemsProps = {
  elementsData: Operation[];
};

export const PreviewItems: FC<PreviewItemsProps> = ({ elementsData, ...props }) => {
  return (
    <>
      {elementsData.map((elementData) => (
        <div className={styles.item} key={elementData.id}>
          <h2 className={styles.title}>
            <span>Название операции:</span>
            {elementData.name}
          </h2>

          <span className={styles.total}>
            <span>Стоимость операции:</span>
            {elementData.amount}
          </span>
          <p className={styles.desc}>
            <span>Краткое описание:</span>
            {elementData.desc}
          </p>
          <NavLink to={`${elementData.id}`} className={`${styles.button}`} >
            show More
          </NavLink>
        </div>
      ))}
    </>
  );
};
