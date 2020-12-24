import React, { useContext } from 'react'
import { NCAAContext, NCAAProvider } from './NCAAContext'
import PropTypes from 'prop-types'

var headers = {
  pragma: 'no-cache',
  'cache-control': 'no-cache'
}

function useNCAA() {
  const [ncaa, setNCAA] = useContext(NCAAContext)

  function changeProxyApi(newProxy) {
    setNCAA((ncaa) => ({ ...ncaa, proxy_api: newProxy }))
  }

  function changeDate(date) {
    const tempDay = ('0' + date.getDate()).slice(-2)
    const tempMonth = ('0' + (date.getMonth() + 1)).slice(-2)
    const tempYear = date.getFullYear()

    setNCAA((ncaa) => ({ ...ncaa, day: tempDay }))
    setNCAA((ncaa) => ({ ...ncaa, month: tempMonth }))
    setNCAA((ncaa) => ({ ...ncaa, year: tempYear }))
  }

  function getGames(sport) {
    var query =
      '/' +
      ncaa.proxy_api +
      '/' +
      ncaa.base_query +
      '/scoreboard' +
      '/' +
      sport +
      '/' +
      ncaa.division +
      '/' +
      ncaa.year +
      '/' +
      ncaa.month +
      '/' +
      ncaa.day +
      '/scoreboard.json'

    if (!ncaa.loadingGames) {
      setNCAA((ncaa) => ({ ...ncaa, loadingGames: true }))
      fetch(query, {
        method: 'GET',
        headers: headers,
        body: JSON.stringify()
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.games.length !== 0) {
            setNCAA((ncaa) => ({ ...ncaa, games: data.games }))
            setNCAA((ncaa) => ({ ...ncaa, sport: sport }))
            setNCAA((ncaa) => ({ ...ncaa, timestamp: Date.UTC() }))
            setNCAA((ncaa) => ({ ...ncaa, loadingGames: false }))
          }
        })
        .catch((error) => {
          console.log(error)
          setNCAA((ncaa) => ({ ...ncaa, games: [] }))
          setNCAA((ncaa) => ({ ...ncaa, sport: 'none' }))
          setNCAA((ncaa) => ({ ...ncaa, loadingGames: false }))
        })
    }
  }

  function getBoxScore(gameID) {
    var query =
      '/' +
      ncaa.proxy_api +
      '/' + ncaa.base_query +
      '/game' +
      '/' + gameID +
      '/boxscore.json'
    if(!ncaa.loadingBoxScore) {
      setNCAA((ncaa) => ({ ...ncaa, loadingBoxScore: true}))
      fetch(query, {
            method: 'GET',
            headers: headers,
            body: JSON.stringify()
      })
      .then((response) => response.json())
      .then((data) => {
        setNCAA((ncaa) => ({ ...ncaa, boxscore: data}))
        setNCAA((ncaa) => ({ ...ncaa, gameID: gameID}))
        setNCAA((ncaa) => ({ ...ncaa, loadingBoxScore: false}))
      })
      .catch((error) => {
        setNCAA((ncaa) => ({ ...ncaa, loadingBoxScore: false}))
        console.log(error)
      })
    }
  }

  function getGameInfo(gameID) {
    var query =
      '/' +
      ncaa.proxy_api +
      '/' +
      ncaa.base_query +
      '/game' +
      '/' +
      gameID +
      '/gameInfo.json'
    if(!ncaa.loadingGameInfo) {
      setNCAA((ncaa) => ({ ...ncaa, loadingGameInfo: true}))
      fetch(query, {
              method: 'GET',
              headers: headers,
              body: JSON.stringify()
      })
      .then((response) => response.json())
      .then((data) => {
        setNCAA((ncaa) => ({ ...ncaa, gameInfo: data}))
        setNCAA((ncaa) => ({ ...ncaa, gameID: gameID}))
        setNCAA((ncaa) => ({ ...ncaa, loadingGameInfo: false}))
      })
      .catch((error) => {
        setNCAA((ncaa) => ({ ...ncaa, loadingGameInfo: false}))
        console.log(error)
      })
    }
  }

  function getPbP(gameID) {
    var query =
      '/' +
      ncaa.proxy_api +
      '/' +
      ncaa.base_query +
      '/game' +
      '/' +
      gameID +
      '/pbp.json'
    if(!ncaa.loadingPbp) {
      setNCAA((ncaa) => ({ ...ncaa, loadingPbp: true}))
      fetch(query, {
              method: 'GET',
              headers: headers,
              body: JSON.stringify()
      })
      .then((response) => response.json())
      .then((data) => {
        setNCAA((ncaa) => ({ ...ncaa, pbp: data}))
        setNCAA((ncaa) => ({ ...ncaa, gameID: gameID}))
        setNCAA((ncaa) => ({ ...ncaa, loadingPbp: false}))
      })
      .catch((error) => {
        setNCAA((ncaa) => ({ ...ncaa, loadingPbp: false}))
        console.log(error
      })
    }
  }

  function toggleGender() {
    if ( ncaa.gender == 'men' ) {
      setNCAA((ncaa) => ({ ...ncaa, gender: 'women'}))
    } else if (ncaa.gender == 'women') {
      setNCAA((ncaa) => ({ ...ncaa, gender: 'men'}))
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
    loadingGames: ncaa.loadingGames,
    loadingGameInfo: ncaa.loadingGameInfo,
    loadingBoxScore: ncaa.loadingBoxScore,
    loadingPbp: ncaa.loadingPbp,
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
