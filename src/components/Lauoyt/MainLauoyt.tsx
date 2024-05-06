import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const MainLauoyt: FC = () => {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};
