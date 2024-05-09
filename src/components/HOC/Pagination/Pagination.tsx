import React, { FC } from 'react';
import cl from './Pagination.module.scss';
import { ButtonArrow } from '../../ui/Button/ButtonArrow';
import { NumericButton } from '../../ui/Button/ButtonNumeric';
import { Button } from '../../ui/Button/Button';

type paginationProps = {
  totalItemCount: number;
  itemsPerPage: number;
  activePageNumber: number;
  changeActivePage: (newCount: number) => void;
  changeItemsPerPage: (newItemsCount: number) => void;
  baseItemsPerPageConst: number;
  showMoreButton:boolean
};

export const Pagination: FC<paginationProps> = ({
  totalItemCount,
  itemsPerPage,
  activePageNumber,
  changeActivePage,
  changeItemsPerPage,
  baseItemsPerPageConst,
  showMoreButton
}) => {

  let pagesButtonsCount = Math.floor(totalItemCount / itemsPerPage);
  if (totalItemCount % itemsPerPage) {
    pagesButtonsCount++;
  }
  const showShowMoreButtom = showMoreButton && !(activePageNumber == pagesButtonsCount)
  const showPrevButtonArrow = pagesButtonsCount > 1 && activePageNumber != 1
  const showNextButtonArrow = pagesButtonsCount > 1 && activePageNumber != pagesButtonsCount
  const pagesButtonsToRender = Array.from({ length: pagesButtonsCount }, (_, index) => index + 1);

  const changeTotalItemsToShowOnPageAtOnce = () => {
    let newItemsPerPageCount;
    if (baseItemsPerPageConst + itemsPerPage > totalItemCount) {
      let itemsCountOnLastNotFullPage =
        totalItemCount - Math.floor(totalItemCount / baseItemsPerPageConst) * baseItemsPerPageConst;
      newItemsPerPageCount = itemsPerPage + itemsCountOnLastNotFullPage;
    } else {
      newItemsPerPageCount = itemsPerPage + baseItemsPerPageConst;
    }
    changeItemsPerPage(newItemsPerPageCount);
  };

  const nextPage = () => {
    if (activePageNumber < pagesButtonsCount) {
      changeActivePage(activePageNumber + 1);
    }
  };
  const prevPage = () => {
    if (activePageNumber > 1) {
      changeActivePage(activePageNumber - 1);
    }
  };
  const currentPage = () => {
    const buttonElem = event.target as HTMLButtonElement;
    let buttonNumber = Number(buttonElem.dataset.pagenumber);

    changeActivePage(buttonNumber);
  };

  return (
    <>
      {pagesButtonsCount != 1  ? (
        <div className={cl.pagination}>
          <div className={cl.buttonsWrapper}>
            {showPrevButtonArrow ? <ButtonArrow rotate={true} onClick={() => prevPage()} /> : null}
            {pagesButtonsToRender.map((elem, index) => (
              <NumericButton
                onClick={() => currentPage()}
                key={index}
                number={elem}
                activity={elem == activePageNumber}
              />
            ))}
            {showNextButtonArrow ? <ButtonArrow onClick={() => nextPage()} /> : null}

          </div>

         {showShowMoreButtom && <Button onClick={() => changeTotalItemsToShowOnPageAtOnce()}>Показать еще</Button>}
        </div>
      ) : null}
    </>
  );
};
