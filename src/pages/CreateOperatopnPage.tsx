import React from "react";
import { Layout } from "src/components/lauout/Layout";
import { CreatingOperationForm } from "src/components/Forms/CreatingOperationForm";
import { redirect } from 'react-router-dom';

export const CreateOperationPage = () => {
    const redirectFunc = () => {
        console.log('redirect')
        return redirect('/operations' );
}
    return (
        <Layout>
            <h1>Cтраница создания операции</h1>
            <CreatingOperationForm redirectFunc={()=>redirectFunc() } />
        </Layout>

    )
}