export default function TableFooter({ page, range, handlePagination }) {
  return (
    <div className='table-footer'>
      {range.map(pageNumber => {
        return (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
            className={page === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}