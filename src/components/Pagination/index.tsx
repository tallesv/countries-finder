import React from 'react';
import BootstrapPagination from 'react-bootstrap/Pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onSelectFirstPage: () => void;
  onSelectPreviousPage: (page: number) => void;
  onSelectPage: (page: number) => void;
  onSelectLastPage: () => void;
  onSelectNextPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onSelectFirstPage,
  onSelectPreviousPage,
  onSelectPage,
  onSelectLastPage,
  onSelectNextPage,
}: PaginationProps): JSX.Element {
  return (
    <BootstrapPagination>
      <BootstrapPagination.Item
        disabled={currentPage === 1}
        onClick={() => onSelectFirstPage()}
      >
        &laquo;
      </BootstrapPagination.Item>
      <BootstrapPagination.Prev
        aria-label="<"
        disabled={currentPage === 1}
        onClick={() => onSelectPreviousPage(currentPage - 1)}
      />
      {currentPage <= 2 &&
        [1, 2, 3, 4, 5].map(pageNumber => (
          <BootstrapPagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            activeLabel=""
            onClick={() => onSelectPage(pageNumber)}
          >
            {pageNumber}
          </BootstrapPagination.Item>
        ))}

      {currentPage > 2 &&
        currentPage <= totalPages - 2 &&
        [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ].map(pageNumber => (
          <BootstrapPagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            activeLabel=""
            onClick={() => onSelectPage(pageNumber)}
          >
            {pageNumber}
          </BootstrapPagination.Item>
        ))}

      {currentPage > totalPages - 2 &&
        [
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ].map(pageNumber => (
          <BootstrapPagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            activeLabel=""
            onClick={() => onSelectPage(pageNumber)}
          >
            {pageNumber}
          </BootstrapPagination.Item>
        ))}
      <BootstrapPagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onSelectNextPage(currentPage + 1)}
      />

      <BootstrapPagination.Item
        disabled={currentPage === totalPages}
        onClick={() => onSelectLastPage()}
      >
        &raquo;
      </BootstrapPagination.Item>
    </BootstrapPagination>
  );
}
