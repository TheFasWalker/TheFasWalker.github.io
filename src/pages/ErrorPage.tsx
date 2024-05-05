import React from "react";
import laughingMan from "src/images/men.png"



export const ErrorPage = () => {
    return (
        <>
            <div className="container errorContainer" >
                <h1>Страинца не найдена или доступ запрещен</h1>
                <img src={laughingMan} alt="" />
            </div>


        </>
    )


}
