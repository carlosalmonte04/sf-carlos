import React from 'react';
import PropTypes from 'prop-types'

const SearchResults = (props) => {

  function handleSignupBtnClick(e) {
    e.preventDefault()
    props.toggleSearchForm()
  }
  return (
    <div>
      <div className={`search-error-container ${props.loginError && props.isShowing ? '' : 'away'}`} >
          <span className={`search-error`} >search error</span>
      </div>
      <div className={`form-wrapper boxed-search-results ${props.isShowing ? '' : 'away'}`}>
        <div className="score-container">
          <strong>coding Percentile</strong>
          <span>{(props.codingPercentile).toFixed(2)}</span>
        </div>
        <div className="score-container">
          <strong>Communication Percentile</strong>
          <span>{(props.communicationPercentile).toFixed(2)}</span>
        </div>
        <button className="primary-btn" onClick={props.handleSearchAgain}>Search Again</button>
      </div>
    </div>
  )
}

const { number } = PropTypes

SearchResults.propTypes = {
  codingPercentile: number.isRequired,
  communicationPercentile: number.isRequired
}

SearchResults.defaultProps = {
  codingPercentile: 0,
  communicationPercentile: 0
}

export default SearchResults