import React, { FC } from "react";
import cl from './Loader.module.scss'

export const Loader: FC = () => {
    return (
        <div className={cl.loaderWrapper}>
            <div className={cl.loader}>
                <img src="loading.svg" alt="" />
            </div>
        </div>
    )
}