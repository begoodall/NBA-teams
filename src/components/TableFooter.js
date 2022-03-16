export default function TableFooter({ page, range, handlePagination, disablePages }) {
  if (disablePages) return null;
  return (
    <div className='table-footer'>
      {range.map(pageNumber => {
        return (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
            className="page-btn"
            disabled={page === pageNumber}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}