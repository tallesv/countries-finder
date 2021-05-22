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
  if (totalPages < 2) {
    return (
      <BootstrapPagination>
        <BootstrapPagination.Item disabled>1</BootstrapPagination.Item>
      </BootstrapPagination>
    );
  }

  if (totalPages >= 2 && totalPages < 6) {
    const pageItens = [];
    for (let page = 1; page < totalPages + 1; page += 1) {
      pageItens.push(
        <BootstrapPagination.Item
          key={page}
          active={page === currentPage}
          activeLabel=""
          onClick={() => onSelectPage(page)}
        >
          {page}
        </BootstrapPagination.Item>,
      );
    }
    return (
      <BootstrapPagination>
        <BootstrapPagination.Item
          disabled={currentPage === 1}
          onClick={() => onSelectFirstPage()}
        >
          &laquo;
        </BootstrapPagination.Item>
        <BootstrapPagination.Prev
          disabled={currentPage === 1}
          onClick={() => onSelectPreviousPage(currentPage - 1)}
        />
        {pageItens}
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

  return (
    <BootstrapPagination>
      <BootstrapPagination.Item
        disabled={currentPage === 1}
        onClick={() => onSelectFirstPage()}
      >
        &laquo;
      </BootstrapPagination.Item>
      <BootstrapPagination.Prev
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
