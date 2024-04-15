import React from "react";
import { useParams } from "react-router-dom";

import { Layout } from "src/components/lauout/Layout";


export const OperationPage = () => {
    const {id} = useParams()
    return (
        <>


            <Layout>
            Operation {id}
            </Layout>
        </>
    )
}