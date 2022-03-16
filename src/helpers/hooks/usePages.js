import { useState, useEffect } from 'react';

export default function usePages(setDisplayedTeams, setCitySortAlphabetical) {
  const [page, setPage] = useState(1);
  const [disablePages, setDisablePages] = useState(false);
  useEffect(() => {
    const getPageData = async () => {
      try {
        if (!disablePages) {
          const response = await fetch(`https://www.balldontlie.io/api/v1/teams?page=${page}&per_page=7`);
          const { data } = await response.json();
          setCitySortAlphabetical(true);
          setDisplayedTeams(data);
        }
      } catch(err) {
        throw err;
      }
    }
    getPageData();
  }, [page, disablePages, setDisplayedTeams, setCitySortAlphabetical]);

  return [page, setPage, disablePages, setDisablePages];
}
