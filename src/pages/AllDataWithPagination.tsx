import React, { FC, useEffect, useState } from 'react';
import { Loader } from 'src/components/Loader/Loader';
import { OperationPreview } from 'src/components/OperationPreview/OperationPreview';
import { Pagination } from 'src/components/HOC/Pagination/Pagination';
import { ButtonSorting } from 'src/components/ui/Button/ButtonSorting';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { getSortedOperationsWithPagination } from 'src/store/redusers/ActionCreater';

export const AllDataWithPagination: FC = () => {
	const dispatch = useAppDispatch()



  const baseItemsPerPage = 9;
  const [activePage, setActivePage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(baseItemsPerPage);
  const [sortingType, setSortingType] = useState<string>();
  const token = useAppSelector(state=>state.authReduser.token)
  const changeActivePage = (newCount: number) => {
    setActivePage(newCount);
  };
  const changeItemsPerPage = (newItemsCount: number) => {
    setItemsPerPage(newItemsCount);
  };
const {error,isLoading,operations}=useAppSelector((state)=>state.operationsReduser)

  useEffect(() => {
    dispatch(getSortedOperationsWithPagination(itemsPerPage, activePage, sortingType,token))

  }, [activePage, itemsPerPage, sortingType])
console.log(operations.pagination.total)
  return (
    <>
      {isLoading && <Loader/>}
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: '25px',
          }}
        >
          <ButtonSorting
            onClickEvent={() => setSortingType('ASC')}
            children={'sotringType 1'}
            activity={sortingType == 'ASC' && true}
          />

          <ButtonSorting
            onClickEvent={() => setSortingType('DESC')}
            children={'sotringType 2'}
            activity={sortingType == 'DESC' && true}
          />
              </div>

        <div className='operationWithSortingWrapper' style={{ display: "grid", gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {operations.data.map((operation) => (
            <OperationPreview
              key={operation.id}
              name={operation.name}
              desc={operation.desc}
              amount={operation.amount}
              id={operation.id}
             />
          ))}


        </div>

        <Pagination
          totalItemCount={operations.pagination.total}
          itemsPerPage={itemsPerPage}
          baseItemsPerPageConst={baseItemsPerPage}
          changeItemsPerPage={changeItemsPerPage}
          activePageNumber={activePage}
          changeActivePage={changeActivePage}
          showMoreButton={true}
        />
      </div>
    </>
  );
};
