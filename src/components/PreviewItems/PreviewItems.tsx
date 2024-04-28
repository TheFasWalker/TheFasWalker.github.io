import React, { FC } from 'react';
import styles from './PreviewItems.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Params } from 'src/client/types';



export type PreviewItemsProps = {
  elementsData: Array<Params>;
};

export const PreviewItems: FC<PreviewItemsProps> = ({ elementsData, ...props }) => {
  return (
    <>
      <div className={styles.wrapper}>
      {elementsData.map((elementData, index) => (
        <div className={styles.item} key={index}>
          <h2 className={styles.title}>
            <span>Название операции:</span>
            {elementData.name}
          </h2>
          <span className={styles.category}>
            <span>Категория операции: </span>
            {elementData.categoryId}
          </span>
          <span className={styles.total}>
            <span>Стоимость операции:</span>
            {elementData.amount}
          </span>{}
          <p className={styles.desc}>
            <span>Краткое описание:</span>
            {elementData.desc ? elementData.desc : 'Описание отсутсвует' }
          </p>
          <NavLink to={`${elementData.id}`} className={`${styles.button}`} >
            show More
          </NavLink>
        </div>
      ))}

      </div>

    </>
  );
};
