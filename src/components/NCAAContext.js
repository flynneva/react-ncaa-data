import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const today = new Date();

const ncaaObj = {
  proxy_api: 'ncaa_api',
  base_query: 'casablanca',
  division: 'd1',
  timestamp: '0',
  day: ('0' + today.getDate()).slice(-2),
  month: ('0' + (today.getMonth() + 1)).slice(-2),
  year: today.getFullYear(),
  sport: 'none',
  games: [],
}

const NCAAContext = createContext([{}, () => {}]);

const NCAAProvider = (props) => {
  const [ ncaa, setNCAA ] = useState(ncaaObj);
  return (
    <NCAAContext.Provider value={[ncaa, setNCAA]}>
      {props.children}
    </NCAAContext.Provider>
  );
}

NCAAProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { NCAAContext, NCAAProvider };

