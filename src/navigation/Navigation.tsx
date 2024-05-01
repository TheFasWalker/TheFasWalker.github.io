import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLauoyt } from 'src/components/Lauoyt/MainLauoyt';
import { CatalogPage } from 'src/pages/CatalogPage';
import { ErrorPage } from 'src/pages/ErrorPage';
import { HomePage } from 'src/pages/HomePage';
import { ProfilePage } from 'src/pages/ProfilePage';
import { PretectedRoutes } from './ProtectedRoutes';

export const Navigation: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLauoyt />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="*" element={<ErrorPage />} />

          <Route element={<PretectedRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};
