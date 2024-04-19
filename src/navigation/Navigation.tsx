import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateOperationPage } from "src/pages/CreateOperatopnPage";
import { ErrorPage } from "src/pages/ErrorPage";
import { HomePage } from "src/pages/HomePage";
import { OperationsPage } from "src/pages/OperationsPage";
import { ProfilePage } from "src/pages/ProfilePage";
import { MainLayout } from "src/components/lauout/MainLayout";
import { ProtectedNavigation } from "./PretectedNavigation";
import { OperationPage } from "src/pages/OperationPage";


export type NavProps = {
    children:React.ReactNode
}

export const Navigation: FC= () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="operations" element={<OperationsPage />} />

                    <Route path="*" element={<ErrorPage />} />
                    <Route element={<ProtectedNavigation />} >
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="/create" element={<CreateOperationPage />} />
                        <Route path="operations/:id" element={<OperationPage/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}