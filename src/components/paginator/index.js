import React from "react";

import ReactPaginate from "react-paginate";

import "./styles.scss";

export function Paginator({ page, onPageChange, total }) {
  const { innerWidth: width } = window;

  return (
    <div className="paginatorContainer">
      <button onClick={() => onPageChange(0)}>Primeira</button>
      <ReactPaginate
        className="paginator"
        forcePage={page}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onPageChange(parseInt(e.selected))}
        pageRangeDisplayed={width > 360 ? 5 : 3}
        marginPagesDisplayed={0}
        pageCount={total}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
      <button onClick={() => onPageChange(499)}>Última</button>
    </div>
  );
}
