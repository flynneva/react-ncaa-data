import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const ncaaObj = {
  base_url: "/ncaa_api/casablanca",
  timestamp: '0',
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

