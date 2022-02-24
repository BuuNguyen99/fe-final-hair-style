import React from 'react';
import Pagination from 'react-js-pagination';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather';

function PaginationComponent({
  handleCallbackPage,
  pageCount,
  limit,
  activePage,
}) {
  const handlePageChange = pageNumber => {
    handleCallbackPage(pageNumber);
  };

  return (
    <div className="pagination-custom d-flex justify-content-between align-items-center">
      <Pagination
        prevPageText={<ChevronLeft />}
        firstPageText={<ChevronsLeft />}
        lastPageText={<ChevronsRight />}
        nextPageText={<ChevronRight />}
        activePage={parseInt(activePage, 10)}
        itemsCountPerPage={limit}
        totalItemsCount={pageCount}
        pageRangeDisplayed={5}
        hideDisabled
        hideNavigation={pageCount <= limit * 5}
        hideFirstLastPages={pageCount <= limit * 5}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default PaginationComponent;
