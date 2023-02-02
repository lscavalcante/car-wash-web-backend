import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import { DOTS, usePagination } from '../../hooks/usePagination';

const Pagination = (props: { onPageChange: (page: number) => void; totalCount: number; siblingCount?: 1; currentPage: number; pageSize: number; className?: string; }) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];

  return (
    <nav className="flex justify-between items-center pt-4 max-sm:mx-3" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{currentPage * totalCount / 100}-{totalCount}</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
      <ul className="inline-flex items-center -space-x-px">
        <li
          className={classnames(
            'cursor-pointer',
            { 'pointer-events-none': currentPage === 1 }
          )}
          onClick={onPrevious}>
          <a className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </a>
        </li>

        {paginationRange!.map((pageNumber: any, key: any) => {
          if (pageNumber === DOTS) {
            return <li key={key}>
              <a className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
            </li>
          }

          return (
            <li
              key={key}
              onClick={() => onPageChange(pageNumber)}
            >
              <a className={classnames(
                // "cursor-pointer py-2 px-3 leading-tight text-white bg-nuPurple hover:opacity-80 transition-all rounded",
                "cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                {
                  'dark:bg-white hover:dark:bg-white hover:dark:text-gray-500 bg-gray-800 hover:text-gray-700': pageNumber === currentPage,
                  // 'bg-purple-500': pageNumber === currentPage,

                }
              )}>
                {pageNumber}
              </a>
            </li>
          );
        })}

        <li className={classnames(
          'cursor-pointer',
          { 'pointer-events-none': currentPage === lastPage }
        )} onClick={onNext}>
          <a className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
