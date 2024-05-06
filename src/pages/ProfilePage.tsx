import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CreateCategoryForm } from 'src/components/Forms/CreateCategoryForm';
import { Loader } from 'src/components/Loader/Loader';
import { PopupWrapper } from 'src/components/PopupWrapper/PopupWrapper';
import { CategoryPreview } from 'src/components/categoriesPrevies/CategoryPreview';
import { Button } from 'src/components/ui/Button/Button';
import { EditButton } from 'src/components/ui/Button/EditButton';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { selectMemoizedCategoryState } from 'src/store/memo/selectMemoizedCategoryState';
import { deleteCategory, getCategories, userData } from 'src/store/redusers/ActionCreater';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReduser.token);
  const { isLoading, profile } = useAppSelector((state) => state.profileReduser);
  const { isLoading: categoryIsLoading } = useAppSelector((state) => state.categoryReduser);
  const data = useAppSelector(selectMemoizedCategoryState);
  const location = useLocation();
  const params = queryString.parse(location.search);

  const [creatingCategoryPopup, setCreatingCategoryPopup] = useState<boolean>(false);
  const openPopupWithDataFromURL = () => {
    if (params.popup === 'true') {
      setCreatingCategoryPopup(true);
    }
  };
  useEffect(() => {
    dispatch(userData(token));
    dispatch(getCategories(token));
    openPopupWithDataFromURL();
  }, []);

  return (
    <>
      <PopupWrapper visible={creatingCategoryPopup} close={() => setCreatingCategoryPopup(!creatingCategoryPopup)}>
        <CreateCategoryForm close={() => setCreatingCategoryPopup(!creatingCategoryPopup)} token={token} />
      </PopupWrapper>

      <div className="container">
        <h1>profile page</h1>
        {isLoading || categoryIsLoading ? <Loader /> : null}
        <div className="profile-content">
          <div className="profile-row">
            <div className="profile-head">
              <h2>Данные</h2>
              <EditButton onClick={() => console.log('edit data')} />
            </div>

            <div className="profile-data">
              <span>email:</span>
              <span>{profile.email}</span>
            </div>
            <div className="profile-data">
              <span>name:</span>
              <span>{profile.name ? profile.name : 'отсутствует'}</span>
            </div>
          </div>
          <div className="profile-row">
            <div className="profile-header">
              <h2>Ваши категории</h2>
              <Button onClick={() => setCreatingCategoryPopup(!creatingCategoryPopup)}>Создать категорию</Button>
            </div>

            <div className="categoriesList">
              {data.map((category) => (
                <CategoryPreview
                  name={category.name}
                  id={category.id}
                  key={category.id}
                  deleteFunc={() => dispatch(deleteCategory(token, category.id))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
