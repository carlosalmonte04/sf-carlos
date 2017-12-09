import React from 'react'
import PropTypes from 'prop-types'

const SearchForm = (props) => {

  return (
    <div>
      <div className={`search-error-container csv ${props.parseError && props.isSearchFormDisplaying ? '' : 'away'}`} >
          {props.isLoading
            ? <span className={`search-loading`} >Connecting to api...</span>
            : <span className={`search-error`} >error parsing csv. Valid url? Heroku dynos being lazy?</span>}
      </div>
      <div className={`form-wrapper boxed-search-form csv ${props.isSearchFormDisplaying ? '' : 'away'} ${props.parsedCorrectly ? 'success' : ''}`}>
        <form id="search-form" className="form csv" >
          <input
            type="text"
            id="csv-url-input"
            onChange={props.handleInputChange} 
            placeholder={props.CSVType} 
            value={props.CSVUrl}
          />
          <div className="btns-container">
            <input type={'submit'} className="primary-btn" value="parse" onClick={(e) => props.handleCsvParse(e)}/>
          </div>
        </form>
        <span className="csv-parse-title">{props.CSVType}</span>
      </div>
    </div>
  )
}

const { string, bool, func } = PropTypes

SearchForm.propTypes = {
  CSVType: string.isRequired,
  CSVUrl: string.isRequired,
  parseError: bool.isRequired,
  parsedCorrectly: bool.isRequired,
  isSearchFormDisplaying: bool.isRequired, // box animator
  handleInputChange: func.isRequired,
  handleCsvParse: func.isRequired,
}


export default SearchForm