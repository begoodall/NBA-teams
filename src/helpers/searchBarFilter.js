export default function searchFilterCheck(team, searchString) {
  if (
    team.city.toLowerCase().startsWith(searchString.toLowerCase())
    || team.name.toLowerCase().startsWith(searchString.toLowerCase())
    || team.abbreviation.toLowerCase().startsWith(searchString.toLowerCase())
    ) {
      return true;
    }
  return false;
}