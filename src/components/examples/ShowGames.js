import React from 'react'
import { useNCAA } from '../NCAA'

const date = new Date()

function ShowGames() {
  const { day, month, year, changeDate, games, getGames } = useNCAA()

  const handleGames = () => {
    getGames('basketball-men')
  }

  const handleDay = (newDay) => {
    if (newDay === 0) {
      newDay = 1
    }
    date.setDate(newDay)
    changeDate(date)
  }

  const handleMonth = (newMonth) => {
    if (newMonth <= 0) {
      newMonth = 0
    }
    date.setMonth(newMonth)
    changeDate(date)
  }

  const handleYear = (newYear) => {
    if (newYear === 0) {
      newYear = 2020
    }
    date.setFullYear(newYear)
    changeDate(date)
  }

  return (
    <div>
      <b>Day: </b>
      <input
        name='dayInput'
        defaultValue={day}
        onChange={(event) => {
          handleDay(event.target.value)
        }}
      />
      <br />
      <b>Month: </b>
      <input
        name='monthInput'
        defaultValue={month}
        onChange={(event) => {
          handleMonth(event.target.value - 1)
        }}
      />
      <br />
      <b>Year: </b>
      <input
        name='yearInput'
        defaultValue={year}
        onChange={(event) => {
          handleYear(event.target.value)
        }}
      />
      <br />
      <button onClick={handleGames}>Refresh Games</button>
      <br />
      <br />
      <b>
        Number of games on {day}-{month}-{year}:
      </b>
      {games.length}
      <br />
      {games.map((game, i) => (
        <li key={i}>{game.game.title}</li>
      ))}
    </div>
  )
}

export default ShowGames
