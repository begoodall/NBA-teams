export default function Team({ team, handleTeamClick }) {
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