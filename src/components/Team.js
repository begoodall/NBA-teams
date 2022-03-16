import PropTypes from 'prop-types';

export default function Team({ team, handleTeamClick }) {
  if (team.name === 'N/A') handleTeamClick = () => {};
  return (
    <tr className="nba-table-row" onClick={() => handleTeamClick(team)}>
      <td>{team.name}</td>
      <td>{team.city}</td>
      <td>{team.abbreviation}</td>
      <td>{team.conference}</td>
      <td>{team.division}</td>
    </tr>
  );
}

Team.propTypes = {
  team: PropTypes.object.isRequired,
  handleTeamClick: PropTypes.func.isRequired,
}
