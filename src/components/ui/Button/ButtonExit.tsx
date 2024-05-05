import React, { FC } from 'react';
import cl from './Button.module.scss';

type ButtonExitProps = {
    type?: 'button' | 'submit'
    onClick:()=>void
}

export const ButtonExit: FC<ButtonExitProps> = ({type, onClick}) => {
  return (
      <button
          type={type}
          className={cl.exit}
      onClick={() => onClick()}
      title='back'
      >
<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="10"  stroke-width="1.5"/>
<path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"  stroke-width="1.5" stroke-linecap="round"/>
</svg>
    </button>
  );
};
