import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "src/pages/ErrorPage";
import { HomePage } from "src/pages/HomePage";
import { OperationPage } from "src/pages/OperationPage";
import { OperationsPage } from "src/pages/OperationsPage";
import { ProfilePage } from "src/pages/ProfilePage";

export type NavProps = {
    children:React.ReactNode
}

export const Navigation: FC= () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="operations" element={<OperationsPage />} >
                    <Route path=":id" element={<OperationPage />} />
                </Route >

                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
    )
}