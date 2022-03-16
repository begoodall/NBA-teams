import { useEffect } from 'react';
import useGameInfo from '../helpers/hooks/useGameInfo';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';

export default function InfoPanel({ displayPanel, team, handleInfoPanelClose }) {
  const [gameData, gamesPlayed] = useGameInfo(team.id);

  useEffect(() => {
    if (displayPanel) {
      document.body.style.overflow = 'hidden';
      ReactDOM.render(<div className="modal-overlay" onClick={() => handleInfoPanelClose()}></div>, document.getElementById('modal-root'))
    } else {
      document.body.style.overflow = 'auto';
      ReactDOM.unmountComponentAtNode(document.getElementById('modal-root'));
    }
  }, [displayPanel, handleInfoPanelClose]);

  if (Object.keys(gameData).length === 0) return null;
  return (
      <div className={displayPanel ? "info-panel active" : "info-panel"}>
        <div className="info-panel-header">
          <h1>{team.name}</h1>
          <div className="info-panel-x-btn" onClick={() => handleInfoPanelClose()}>&#10005;</div>
        </div>
        <Table borderless>
          <tbody>
            <tr>
              <td>Team Full Name</td>
              <td>{team.full_name}</td>
            </tr>
            <tr>
              <td>Total Games in 2021</td>
              <td>{gamesPlayed}</td>
            </tr>
            <tr className="info-panel-bold">
              <td>Random Game Details:</td>
            </tr>
            <tr className="info-panel-bold">
              <td>Date</td>
              <td>{gameData.date.substring(0, 10)}</td>
            </tr>
            <tr className="info-panel-bold">
              <td>Home Team</td>
              <td>{gameData.home_team.name}</td>
            </tr>
            <tr className="info-panel-bold">
              <td>Home Team Score</td>
              <td>{gameData.home_team_score}</td>
            </tr>
            <tr className="info-panel-bold">
              <td>Visitor Team</td>
              <td>{gameData.visitor_team.name}</td>
            </tr>
            <tr className="info-panel-bold">
              <td>Visitor Team Score</td>
              <td>{gameData.visitor_team_score}</td>
            </tr>
          </tbody>
        </Table>
    </div>
  );
}