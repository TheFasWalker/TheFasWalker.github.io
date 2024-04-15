import { Link, Outlet } from "react-router-dom";
import { Header } from "../header-2/Header";
import React from "react";


export const MainLayout = () => {
    return (
        <>
        <Header/>
            <Outlet/>

        </>
    )
}