import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "src/store";




export const PretectedRoutes: FC = () => {
    const authState = useSelector((state: RootState) => state.auth.autorisationToken)

    return !authState ? <Navigate to="/" replace /> : <Outlet/>
}