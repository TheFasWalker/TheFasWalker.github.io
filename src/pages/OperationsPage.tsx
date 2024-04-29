import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "src/client/fetch";
import { Operation, fetchOperationsData } from "src/client/types";
import { PreviewItems } from "src/components/PreviewItems/PreviewItems";
import { Layout } from "src/components/lauout/Layout";
import { RootState } from "src/store";


export const OperationsPage = () => {

    // const operations = useSelector((state: RootState) => state.data)
    const [isLoaded, setIsLoaded] = useState(false);
    const token = useSelector((state: RootState) => state.auth.login);
    const dispatch = useDispatch()

    const [operations,setOpedrations] = useState<Operation[]>([])
    const getOperations = () => {
        fetchData<fetchOperationsData>('/operations', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            setIsLoaded(true);
            setOpedrations(res.data)
        }).catch(e=>console.log(e))

    }


    useEffect(() => {
        getOperations()
    },[])
    if (!isLoaded) {
        <h1>loading</h1>

    }else{
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
}