import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { ServerErrors } from "src/models/ServerErrors";
import { autorisation } from "src/store/redusers/ActionCreater";


export const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const { token, error, isLoading } = useAppSelector(state => state.authReduser)

    useEffect(() => {
        // dispatch(autorisation())
    },[])
    return (
        <>
            <h1>profile pagesss</h1>
            {isLoading && <h1>Loading</h1>}
            {token}
            {error && <span>{ }</span>}
            <button onClick={()=>(console.log(error))}>error</button>



        </>
    )
}