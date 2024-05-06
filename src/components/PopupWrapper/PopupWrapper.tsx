import React, { FC, ReactEventHandler } from 'react';
import cl from './PopupWrapper.module.scss';
import { CSSTransition } from 'react-transition-group';

type popupWrapperProps = {
  visible: boolean;
  children: React.ReactNode;
  close?: ReactEventHandler;
};

export const PopupWrapper: FC<popupWrapperProps> = ({ visible, children, close }) => {
  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames="alert" unmountOnExit>
        <div className={cl.wrapper} onClick={close}>
          <div className={cl.container} onClick={(e) => e.stopPropagation()}>
            <button className={cl.close} onClick={close}>
              &#9747;
            </button>
            <div className={cl.content}>{children}</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
