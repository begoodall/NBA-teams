import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';

export default function InfoPanel({ displayPanel, team, handleInfoPanelClose }) {
  const [gameData, setGameData] = useState({});
  const [gamesPlayed, setGamesPlayed] = useState(0);
  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${team.id}&per_page=100`);
        const { data } = await response.json();
        setGamesPlayed(data.length);
        setGameData(data[data.length - 1]);
      } catch(err) {
        console.error(err);
      }
    }
    getGameData();
  }, [team]);

  useEffect(() => {
    if (displayPanel) {
      document.body.style.overflow = 'hidden';
      ReactDOM.render(<div className="modal-overlay" onClick={() => handleInfoPanelClose()}></div>, document.getElementById('modal-root'))
    } else {
      document.body.style.overflow = 'auto';
      ReactDOM.unmountComponentAtNode(document.getElementById('modal-root'));
    }
  }, [displayPanel, handleInfoPanelClose]);

  return Object.keys(gameData).length ? (
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
  ) : null;
}