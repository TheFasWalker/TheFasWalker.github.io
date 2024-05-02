import React, { FC } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "src/hooks/redux";





export const PretectedRoutes: FC = () => {

    const authState = useAppSelector(state=>state.authReduser.token)

    return !authState ? <Navigate to="/" replace /> : <Outlet/>

}