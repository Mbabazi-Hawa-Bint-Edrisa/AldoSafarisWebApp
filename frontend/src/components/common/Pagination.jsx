import React, { useState, useEffect } from "react";

export default function Pagination({ totalRecords, recordsPerPage = 10, onPageChange }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // Trigger `onPageChange` whenever `activeIndex` changes
  useEffect(() => {
    if (onPageChange) onPageChange(activeIndex);
  }, [activeIndex, onPageChange]);

  if (totalPages <= 1) return null; // No pagination needed for 1 or fewer pages

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setActiveIndex(page);
  };

  return (
    <div className="pagination justify-center">
      <button
        onClick={() => handlePageClick(activeIndex - 1)}
        className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
        disabled={activeIndex === 1}
      >
        <i className="icon-arrow-left text-15"></i>
      </button>

      <div className="pagination__count">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handlePageClick(1)}
          className={activeIndex === 1 ? `is-active` : ""}
        >
          1
        </div>

        {activeIndex > 3 && totalPages > 5 && <div>...</div>}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, activeIndex - 2), Math.min(totalPages, activeIndex + 1))
          .map((page) => (
            <div
              key={page}
              style={{ cursor: "pointer" }}
              onClick={() => handlePageClick(page)}
              className={activeIndex === page ? `is-active` : ""}
            >
              {page}
            </div>
          ))}

        {activeIndex < totalPages - 2 && totalPages > 5 && <div>...</div>}

        {totalPages > 1 && (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handlePageClick(totalPages)}
            className={activeIndex === totalPages ? `is-active` : ""}
          >
            {totalPages}
          </div>
        )}
      </div>

      <button
        onClick={() => handlePageClick(activeIndex + 1)}
        className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
        disabled={activeIndex === totalPages}
      >
        <i className="icon-arrow-right text-15"></i>
      </button>
    </div>
  );
}
