import PropTypes from 'prop-types';

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

TableFooter.propTypes = {
  page: PropTypes.number.isRequired,
  range: PropTypes.array.isRequired,
  handlePagination: PropTypes.func.isRequired,
  disablePages: PropTypes.bool.isRequired,
}