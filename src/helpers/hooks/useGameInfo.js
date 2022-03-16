import { useState, useEffect } from 'react';

export default function useGameInfo(teamId) {
  const [gameData, setGameData] = useState({});
  const [gamesPlayed, setGamesPlayed] = useState(0);
  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${teamId}&per_page=100`);
        const { data } = await response.json();
        setGamesPlayed(data.length);
        setGameData(data[data.length - 1]);
      } catch(err) {
        throw err;
      }
    }
    getGameData();
  }, [teamId]);
  return [gameData, gamesPlayed];
}
