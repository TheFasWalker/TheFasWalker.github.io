import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PopupWrapper } from "src/components/PopupWrapper/PopupWrapper";
import { Button } from "src/components/button/Button";
import { Layout } from "src/components/lauout/Layout";


export const ProfilePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [popupState, setPopupState]= useState(searchParams.get('modal')=='true'? true:false)
    return (
        <>


            <Layout>
                <Button
                onClick={()=>setPopupState(!popupState)}>
                    openPopup
                </Button>
            <PopupWrapper
            visible={popupState}
            close={()=>setPopupState(!popupState)}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, ducimus!
            </PopupWrapper>
                ProfilePage
            </Layout>

        </>
    )
}