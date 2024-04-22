import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "src/client/fetch";
import { Operations } from "src/client/types";
import { PreviewItems } from "src/components/PreviewItems/PreviewItems";
import { Layout } from "src/components/lauout/Layout";
import { RootState } from "src/store";
import { addOperationsToStorage } from "src/store/dataSlise";


export const OperationsPage = () => {
    const dispatch = useDispatch();
    const dataState = useSelector((state :RootState)=>state.data)




    const getDataArray = () => {
        fetchData<Operations>('/operations', {
            method:"GET"
        })
            .then((res) => {
                dispatch({ type: 'error', payload: res })

                dispatch(addOperationsToStorage(res.data))
        }).catch(e=>console.log(e))
    }


    useEffect(() => {
        if (operations.length == 0) {
        getDataArray()
        }
    }, [])

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