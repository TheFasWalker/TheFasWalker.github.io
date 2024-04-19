import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PreviewItems } from "src/components/PreviewItems/PreviewItems";
import { Layout } from "src/components/lauout/Layout";
import { RootState } from "src/store";


export const OperationsPage = () => {

    const operations = useSelector((state: RootState) => state.data)

    return (
        <>

            <Layout>
                <PreviewItems
                elementsData={operations}
                />
            </Layout>

        </>
    )
}