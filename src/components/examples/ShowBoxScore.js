import React, { useEffect } from 'react'
import { useNCAA } from '../NCAA'

const gameID = '3912213';

const date = new Date();

function ShowBoxScore() {
  const { getBoxScore, boxscore, loadingBoxScore } = useNCAA();

  const handleBoxScore = () => {
    getBoxScore(gameID);
  }

  let gameTitle;
  if (typeof boxscore === 'undefined' || boxscore.length === 0) {
    gameTitle = <b>Click refresh to get game data for game ID 3912213</b>
  } else {
    gameTitle = <b>{boxscore.meta['description']}</b>
  }
 
  let score_viz = [];
  if (typeof boxscore === 'undefined' || boxscore.length === 0 || loadingBoxScore) {
    score_viz = <p>No score to report</p>
  } else {
    console.log(boxscore);
    score_viz = <p>Boxscore printed to console!</p>
  }

  return (
    <div>
      <button onClick={handleBoxScore}>Refresh Boxscore</button><br />
      <br />
      {gameTitle}
      {score_viz}
    </div>
  );
}

export default ShowBoxScore;
