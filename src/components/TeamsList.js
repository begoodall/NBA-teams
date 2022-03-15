import Team from './Team'

export default function TeamsList({ teams, handleTeamClick }) {
  console.log('teams', teams);
  return (
    <>
      {teams.map(team => {
        return (
        <Team
          key={team.id}
          team={team}
          handleTeamClick={handleTeamClick}
        />)}
      )}
    </>
  );
}