import React from 'react'
import PropTypes from 'prop-types'

const CSVResults = (props) => {

  return (
    <div>
      <div className={`form-wrapper boxed-search-results csv ${props.isSearchFormDisplaying ? '' : 'away'}`}>
        <span>CSV parsed to hash table ⚡️⚡️</span>
      </div>
    </div>
  )
}

const { bool } = PropTypes

CSVResults.propTypes = {
  isSearchFormDisplaying: bool.isRequired
}

export default CSVResults