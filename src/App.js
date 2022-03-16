import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import TeamsList from './components/TeamsList';
import searchFilterCheck from './helpers/appHelper';
import InfoPanel from './components/InfoPanel';


const App = () => {
  const [nbaTeamData, setNbaTeamData] = useState([]);
  const [displayedTeamData, setDisplayedTeams] = useState([]);
  const [citySortAlphabetical, setCitySortAlphabetical] = useState(true);
  const [displayInfoPanel, setDisplayInfoPanel] = useState(false);
  const [infoPanelTeam, setInfoPanelTeam] = useState({ id: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getNbaData = async () => {
      const response = await fetch('https://www.balldontlie.io/api/v1/teams');
      const { data } = await response.json();
      setNbaTeamData(data);
    }
    getNbaData();
  }, []);

  useEffect(() => {
    const getPageData = async () => {
      const response = await fetch(`https://www.balldontlie.io/api/v1/teams?page=${page}&per_page=7`);
      const { data } = await response.json();
      setDisplayedTeams(data);
    }
    getPageData();
  }, [page]);

  const handlePagination = (page) => {
    setPage(page);
  }

  const handleSearch = (str) => {
    if (!str) {
      const firstPage = fetch(`https://www.balldontlie.io/api/v1/teams?page=1&per_page=7`);
      firstPage.then((res) => {
        return res.json();
      }).then(({ data }) => {
        setDisplayedTeams(data);
      });
      return;
    }

    const filteredList = nbaTeamData.filter(team => searchFilterCheck(team, str));

    if (filteredList.length > 0) {
      setDisplayedTeams(filteredList);
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
      <SearchBar handleSearch={handleSearch}/>
      <TeamsList
        teams={displayedTeamData}
        citySortAlphabetical={citySortAlphabetical}
        page={page}
        handleTeamClick={handleTeamClick}
        handleCitySort={handleCitySort}
        handlePagination={handlePagination}
      />
      <InfoPanel
        displayPanel={displayInfoPanel}
        team={infoPanelTeam}
        handleInfoPanelClose={handleInfoPanelClose}
      />
    </div>
  ) : null;
}

export default App;
