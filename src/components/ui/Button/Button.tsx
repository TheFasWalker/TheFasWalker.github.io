import React, { FC } from 'react';
import cl from './Button.module.scss';
import cn from 'classnames';

type ButtonProps = {
  children: string;
  buttonType?: 'submit' | 'reset';
  elementClass?: string;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, buttonType, elementClass, onClick }) => {
  return (
    <button type={buttonType ? buttonType : 'button'} className={cn(cl.button, elementClass)} onClick={onClick}>
      {children}
    </button>
  );
};
