import React, { FC, useState } from "react"
import cl from './CategoryPreview.module.scss'
import { DeleteButton } from "../ui/Button/DeleteButton"
import { EditButton } from "../ui/Button/EditButton"
import { ButtonSubmit } from "../ui/Button/ButtonSubmit"
import { ButtonExit } from "../ui/Button/ButtonExit"
import { EditCategoryForm } from "../Forms/EditCategoryForm"

type Category = {
    name: string,
    id: string,
    deleteFunc:()=>void
}

export const CategoryPreview: FC<Category> = ({ name, id, deleteFunc }) => {
    const [editcategoryState, setEditcategoryState]=useState(false)
    return (
    <>
    {!editcategoryState ?
        <div className={cl.category}>
            <div className={cl.info}>
                <span>Название категории:</span>
                <span>{name}</span>
            </div>
            <div className={cl.buttons}>
                <DeleteButton
                onClick={deleteFunc}/>
                <EditButton
                    onClick={() => setEditcategoryState(!editcategoryState)} />
            </div>
        </div>
:
                <EditCategoryForm
                    close={() => setEditcategoryState(!editcategoryState)}
                    name={name}
                    id={id}
        />

}


    </>




    )
}