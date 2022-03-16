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