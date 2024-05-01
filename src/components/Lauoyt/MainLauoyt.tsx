import React, { FC } from "react";
import { Link, Outlet } from 'react-router-dom';
import { Header } from "../Header/Header";

export const MainLauoyt: FC = () => {
    return (
        <>
            <Header />
            <div className="content">
            <Outlet/>
            </div>

        </>
    )
}