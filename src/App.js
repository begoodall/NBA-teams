import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import TeamsList from './components/TeamsList';
import searchFilterCheck from './helpers/searchBarFilter';
import InfoPanel from './components/InfoPanel';
import usePages from './helpers/hooks/usePages';


export default function App() {
  const [nbaTeamData, setNbaTeamData] = useState([]);
  const [displayedTeamData, setDisplayedTeams] = useState([]);
  const [citySortAlphabetical, setCitySortAlphabetical] = useState(true);
  const [displayInfoPanel, setDisplayInfoPanel] = useState(false);
  const [infoPanelTeam, setInfoPanelTeam] = useState({ id: 1 });
  const [page, setPage, disablePages, setDisablePages] = usePages(setDisplayedTeams, setCitySortAlphabetical);

  useEffect(() => {
    const getNbaData = async () => {
      try {
        const response = await fetch('https://www.balldontlie.io/api/v1/teams');
        const { data } = await response.json();
        setNbaTeamData(data);
      } catch(err) {
        throw err;
      }
    }
    getNbaData();
  }, []);

  const handlePagination = (page) => {
    if (!disablePages) {
      setPage(page);
    }
  }

  const handleSearch = (str) => {
    if (!str) {
      setPage(1);
      setCitySortAlphabetical(true);
      setDisablePages(false);
      return;
    }

    setDisablePages(true);
    const filteredList = nbaTeamData.filter(team => searchFilterCheck(team, str));

    if (filteredList.length > 0) {
      setDisplayedTeams(filteredList);
    } else {
      setDisplayedTeams([{
        id: '',
        name: 'N/A',
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

  const handleInfoPanelClose = () => setDisplayInfoPanel(false);

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
        disablePages={disablePages}
      />
      <InfoPanel
        displayPanel={displayInfoPanel}
        team={infoPanelTeam}
        handleInfoPanelClose={handleInfoPanelClose}
      />
    </div>
  ) : null;
}
