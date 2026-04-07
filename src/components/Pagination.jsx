import React from "react";
import "./css/Pagination.css";

const Pagination = ({ pages, page, onPageChange }) => {
  if (!pages || pages <= 1) return null;

  const isFirst = page === 1;
  const isLast = page === pages;

  return (
    <nav className="zoof-pagination" aria-label="Page navigation">
      {/* Prev */}
      <button
        className="zpag-btn zpag-prev"
        onClick={() => onPageChange(page - 1)}
        disabled={isFirst}
        aria-label="Previous page"
      >
        <i className="bi bi-arrow-left" />
      </button>

      {/* Page numbers */}
      <ul className="zpag-list">
        {[...Array(pages).keys()].map((x) => {
          const p = x + 1;
          const isActive = p === page;

          // Always show first, last, current, and ±1 neighbors; rest → ellipsis
          const show =
            p === 1 ||
            p === pages ||
            Math.abs(p - page) <= 1;

          const showLeftEllipsis = p === 2 && page > 3;
          const showRightEllipsis = p === pages - 1 && page < pages - 2;

          if (!show) return null;

          return (
            <React.Fragment key={p}>
              {showLeftEllipsis && (
                <li className="zpag-ellipsis" aria-hidden>…</li>
              )}
              <li>
                <button
                  className={`zpag-item ${isActive ? "active" : ""}`}
                  onClick={() => !isActive && onPageChange(p)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {p}
                </button>
              </li>
              {showRightEllipsis && (
                <li className="zpag-ellipsis" aria-hidden>…</li>
              )}
            </React.Fragment>
          );
        })}
      </ul>

      {/* Next */}
      <button
        className="zpag-btn zpag-next"
        onClick={() => onPageChange(page + 1)}
        disabled={isLast}
        aria-label="Next page"
      >
        <i className="bi bi-arrow-right" />
      </button>
    </nav>
  );
};

export default Pagination;