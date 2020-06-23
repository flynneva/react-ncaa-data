import React, { useContext } from 'react'
import { NCAAContext, NCAAProvider } from './NCAAContext'
import PropTypes from 'prop-types'

function useNCAA() {
  const [ ncaa, setNCAA ] = useContext(NCAAContext);

  function changeProxyApi(new_proxy) {
    setNCAA(ncaa => ({ ...ncaa, proxy_api: new_proxy}));
  }

  function changeDate(date) {
    const tempDay = ('0' + date.getDate()).slice(-2);
    const tempMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const tempYear = date.getFullYear();

    setNCAA(ncaa => ({ ...ncaa, day: tempDay}));
    setNCAA(ncaa => ({ ...ncaa, month: tempMonth}));
    setNCAA(ncaa => ({ ...ncaa, year: tempYear}));
  }

  function getGames(sport) {
    var query = '/' + ncaa.proxy_api +
                '/' + ncaa.base_query +
		'/scoreboard' +
                '/' + sport +
                '/' + ncaa.division +
                '/' + ncaa.year +
                '/' + ncaa.month +
                '/' + ncaa.day +
                '/scoreboard.json';
    fetch(query, {
            method: 'GET',
            body: JSON.stringify()
    })
    .then(response => response.json())
    .then(data => {
      if (data.games.length !== 0) {
        setNCAA(ncaa => ({ ...ncaa, games: data.games}));
        setNCAA(ncaa => ({ ...ncaa, sport: sport}));
        setNCAA(ncaa => ({ ...ncaa, timestamp: Date.UTC()}));
      } 
    })
    .catch(error => {
      console.log(error);
      setNCAA(ncaa => ({ ...ncaa, games: [] }));
      setNCAA(ncaa => ({ ...ncaa, sport: 'none'}));
    });
  }

  function getBoxScore(gameID) {
    var query = '/' + ncaa.proxy_api +
                '/' + ncaa.base_query +
                '/game' +
                '/' + gameID +
                '/boxscore.json';
    fetch(query, {
            method: 'GET',
            body: JSON.stringify()
    })
    .then(response => response.json())
    .then(data => {
      setNCAA(ncaa => ({ ...ncaa, boxscore: data}));
      setNCAA(ncaa => ({ ...ncaa, gameID: gameID}));
    })
    .catch(error => {
      console.log(error);
    })
  }

  function getGameInfo(gameID) {
    var query = '/' + ncaa.proxy_api +
                '/' + ncaa.base_query +
                '/game' +
                '/' + gameID +
                '/gameInfo.json';
    fetch(query, {
            method: 'GET',
            body: JSON.stringify()
    })
    .then(response => response.json())
    .then(data => {
      setNCAA(ncaa => ({ ...ncaa, gameInfo: data}));
      setNCAA(ncaa => ({ ...ncaa, gameID: gameID}));
    })
    .catch(error => {
      console.log(error);
    })
  }

  function getPbP(gameID) {
    var query = '/' + ncaa.proxy_api +
                '/' + ncaa.base_query +
                '/game' +
                '/' + gameID +
                '/pbp.json';
    fetch(query, {
            method: 'GET',
            body: JSON.stringify()
    })
    .then(response => response.json())
    .then(data => {
      setNCAA(ncaa => ({ ...ncaa, pbp: data}));
      setNCAA(ncaa => ({ ...ncaa, gameID: gameID}));
    })
    .catch(error => {
      console.log(error);
    })
  }

  function toggleGender() {
    if ( ncaa.gender == 'men' ) {
      setNCAA(ncaa => ({ ...ncaa, gender: 'women'}));
    } else if (ncaa.gender == 'women') {
      setNCAA(ncaa => ({ ...ncaa, gender: 'men'}));
    }
  }

  return {
    changeProxyApi,
    changeDate,
    getGames,
    getBoxScore,
    getPbP,
    getGameInfo,
    toggleGender,
    gender: ncaa.gender,
    sport: ncaa.sport,
    games: ncaa.games,
    gameID: ncaa.gameID,
    gameInfo: ncaa.gameInfo,
    boxscore: ncaa.boxscore,
    pbp: ncaa.pbp,
    proxy_api: ncaa.proxy_api,
    timestamp: ncaa.timestamp,
    day: ncaa.day,
    month: ncaa.month,
    year: ncaa.year,
  }
}

function NCAA(props) {
  return (
    <NCAAProvider>
      {props.children}
    </NCAAProvider>
  );
}

NCAA.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useNCAA, NCAA };
