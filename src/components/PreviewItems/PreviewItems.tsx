import React, { FC } from 'react';
import styles from './PreviewItems.module.scss';
import { Link, NavLink } from 'react-router-dom';




type category =  {
  createdAt: string,
  id:string,
  name: string,
  updatedAt: string,
  photo: string
}

  type obj = {
    amount: number;
    createdAt: string;
    desc: string,
    id: string,
    type: string,
    updatedAt: string,
    category: category,
    name:string
  };

export type PreviewItemsProps = {
  elementsData: Array<obj>;
};

export const PreviewItems: FC<PreviewItemsProps> = ({ elementsData, ...props }) => {
  return (
    <>
      {elementsData.map((elementData, index) => (
        <div className={styles.item} key={index}>
          <h2 className={styles.title}>
            <span>Название операции:</span>
            {elementData.name}
          </h2>
          <span className={styles.category}>
            <span>Категория операции: </span>
            { elementData.category ? elementData.category.name : 'Категория отсутствует' }
          </span>
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
