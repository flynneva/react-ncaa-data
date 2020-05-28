import React, { useEffect } from 'react'
import { useNCAA } from '../NCAA'

const date = new Date();

function ShowGames() {
  const { day, month, year, changeDate, games, getGames, sport, gender } = useNCAA();

  const handleGames = () => {
    getGames('basketball-men');
  }

  const handleDay = (new_day) => {
    if (new_day == 0) {
      new_day = 1;
    }
    date.setDate(new_day);
    changeDate(date);
  }

  const handleMonth = (new_month) => {
    if (new_month == 0) {
      new_month = 1;
    }
    date.setMonth(new_month);
    changeDate(date);
  }

  const handleYear = (new_year) => {
    if (new_year == 0) {
      new_year = 2020;
    }
    date.setFullYear(new_year);
    changeDate(date);
  }

  return (
    <div>
      <b>Day: </b><input name="dayInput" defaultValue={ day } onChange={event => {handleDay(event.target.value)}}/> <br />
      <b>Month: </b><input name="monthInput" defaultValue={ month } onChange={event => {handleMonth(event.target.value)}}/> <br />
      <b>Year: </b><input name="yearInput" defaultValue={ year } onChange={event => {handleYear(event.target.value)}}/> <br />
      <button onClick={handleGames}>Refresh Games</button><br />
      <br />
      <b>Number of games on {day}-{month}-{year}: </b>{games.length}<br />
      { games.map((game, i) => <li key={i}>{game.game.title}</li>) }
    </div>
  );
}

export default ShowGames;
