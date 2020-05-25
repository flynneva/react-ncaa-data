import React, { useContext } from 'react'
import { NCAAContext, NCAAProvider } from './NCAAContext'
import PropTypes from 'prop-types'

function useNCAA() {
  const [ ncaa, setNCAA ] = useContext(NCAAContext);

  return {
    timestamp: ncaa.timestamp,
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
