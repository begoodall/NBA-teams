import './App.css';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'


import SearchBar from './components/SearchBar';
import TeamsList from './components/TeamsList';
import searchFilterCheck from './helpers/appHelper';
import InfoPanel from './components/InfoPanel';
import Caret from './components/Caret';


const App = () => {
  const [nbaTeamData, setNbaTeamData] = useState([]);
  const [displayedTeamData, setDisplayedTeams] = useState([]);
  const [citySortAlphabetical, setCitySortAlphabetical] = useState(true);
  const [displayInfoPanel, setDisplayInfoPanel] = useState(false);
  const [infoPanelTeam, setInfoPanelTeam] = useState({});

  useEffect(() => {
    const getNbaData = async () => {
      const response = await fetch('https://www.balldontlie.io/api/v1/teams');
      const { data } = await response.json();
      setDisplayedTeams(data);
      setNbaTeamData(data);
    }
    getNbaData();
  }, []);

  const handleSearch = (str) => {
    if (!str) {
      setDisplayedTeams(nbaTeamData);
      return;
    }

    const filteredList = nbaTeamData.filter(team => searchFilterCheck(team, str));

    if (filteredList.length > 0) {
      setDisplayedTeams(filteredList)
    } else {
      setDisplayedTeams([{
        id: '',
        name: 'No results found',
        city: '',
        abbreviation: '',
        conference: '',
        division: '',
      }]);
    }
  }

  const handleCitySort = () => {
    const sortedList = [...nbaTeamData].reverse();
    setNbaTeamData(sortedList);

    const sortedDisplayList = [...displayedTeamData].reverse();
    setDisplayedTeams(sortedDisplayList);

    setCitySortAlphabetical(!citySortAlphabetical);
  }

  const handleTeamClick = (team) => {
    setInfoPanelTeam(team);
    setDisplayInfoPanel(true);
  }

  const handleInfoPanelClose = () => {
    setDisplayInfoPanel(false);
  }

  return nbaTeamData.length ? (
    <div>
      <h1 className='heading'>NBA TEAMS</h1>
      <SearchBar handleSearch={handleSearch} />
      <section>
        <Table borderless hover>
          <thead className='nba-table-header'>
            <tr>
              <th>Team Name</th>
              <th onClick={() => handleCitySort()} style={{cursor: 'pointer'}}>
                City
                <Caret alphabeticalSort={citySortAlphabetical}/>
              </th>
              <th>Abbreviation</th>
              <th>Conference</th>
              <th>Division</th>
            </tr>
          </thead>
          <tbody>
            <TeamsList
              teams={displayedTeamData}
              handleTeamClick={handleTeamClick}
            />
          </tbody>
        </Table>
      </section>
      <InfoPanel
        displayPanel={displayInfoPanel}
        teamInfo={infoPanelTeam}
        handleInfoPanelClose={handleInfoPanelClose}
      />
    </div>
  ) : null;
}

export default App;
