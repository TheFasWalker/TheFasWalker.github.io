import { FC } from 'react';
import cl from './Button.module.scss';
import React from 'react';
import cn from 'classnames';

type SortingButtonProps = {
  children: string;
  onClickEvent: () => void;
  activity?: boolean;
};

export const ButtonSorting: FC<SortingButtonProps> = ({ children, onClickEvent, activity }) => {
  return (
    <button onClick={onClickEvent} className={cn(cl.sortingButton, activity && cl.sortingButton_active)}>
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560.209 560.209">
        <g>
          <g>
            <polygon
              points="141.449,241.854 390.074,241.854 390.074,174.917 141.449,174.917 141.449,124.351 0,206.014 141.449,287.678
			"
            />
            <polygon
              points="170.136,385.292 418.762,385.292 418.762,435.858 560.209,354.194 418.762,272.531 418.762,318.354
			170.136,318.354 		"
            />
          </g>
        </g>
      </svg>
      {children}
    </button>
  );
};
