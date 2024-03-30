import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "src/components/header-2/Header";
import { Layout } from "src/components/lauout/Layout";


export const OperationPage = () => {
    const {id} = useParams()
    return (
        <>
        <Header/>

            <Layout>
            Operation {id}
            </Layout>
        </>
    )
}