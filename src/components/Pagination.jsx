import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ pages, page, onPageChange }) => {
  return (
    <BootstrapPagination className="justify-content-center mt-4">
      {[...Array(pages).keys()].map((x) => (
        <BootstrapPagination.Item
          key={x + 1}
          active={x + 1 === page}
          onClick={() => onPageChange(x + 1)}
        >
          {x + 1}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
  );
};

export default Pagination;
