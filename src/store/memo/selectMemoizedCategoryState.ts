import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";



const categoryState = (state: RootState) => state.categoryReduser.data.data;

export const selectMemoizedCategoryState = createSelector(
    categoryState,
    (data)=>data
)