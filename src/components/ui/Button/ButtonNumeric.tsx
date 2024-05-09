import React, { FC } from 'react';
import cl from './Button.module.scss';
import cn from 'classnames';

type numericBtn = {
  number: number;
  onClick?: () => void;
  activity?: boolean;
};

export const NumericButton: FC<numericBtn> = ({ number, onClick, activity }) => {
  return (
    <button
      data-pagenumber={number}
      onClick={() => onClick()}
      className={cn(cl.numericBtn, activity ? cl.active : '')}
      type="button"
    >
      {number}
    </button>
  );
};
