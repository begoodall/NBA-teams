import PropTypes from 'prop-types';

export default function SearchBar({ handleSearch }) {
  return (
    <input
      type="search"
      className="searchbar"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search for a team"
    />
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
}