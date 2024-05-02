import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { fetchOperations } from "src/store/redusers/ActionCreater";



export const HomePage = () => {
    const dispatch = useAppDispatch()

    const { operations, isLoading, error } = useAppSelector(state => state.operationsReduser)
    const token = useAppSelector(state=>state.authReduser.token)
    useEffect(() => {
        dispatch(fetchOperations())
    }, [])

    return (
        <>
            <h1>HomePage</h1>
            {token}
            {/* {isLoading && <h1>Loading</h1>}
            {error ?
                <h1>{error}</h1>
                :
                JSON.stringify(operations, null, 2)
                } */}
        </>
    )
}