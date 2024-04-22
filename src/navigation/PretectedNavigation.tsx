import { Navigate, useLocation , Outlet} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import React, { FC} from 'react';



export const ProtectedNavigation:FC = () => {
    const authState = useSelector((state: RootState) => state.auth.login)
    if (authState == '' || authState == null) {
       return <Navigate to="/" replace />
    }
    return (authState == '') ? <Navigate to="/" replace /> : <Outlet/>

}