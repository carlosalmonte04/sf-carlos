import React from 'react';
import PropTypes from 'prop-types'

const SearchForm = (props) => {
  let { candidatesAsOptions } = props
  candidatesAsOptions = candidatesAsOptions.map(candidateId => <li key={candidateId} id={candidateId} value={candidateId} onClick={props.handleOptionClick}>{candidateId}</li>)
  return (
    <div>
      <div className={`search-error-container ${props.searchError && props.isDisplaying ? '' : 'away'}`} >
          <p className={`search-error`} >Search Error. CSVs parsed correctly? Candidate selected?</p>
      </div>
      <div className={`form-wrapper boxed-search-form ${props.isDisplaying ? '' : 'away'}`}>
        <form id="search-form" className="form" >
          <input type={'text'} onChange={props.handleInputChange} value={props.candidateId} required/>
          <label>candidate id</label>
          <div>
            <ul className="candidates-as-options">
              {candidatesAsOptions}
            </ul>
          </div>
          <div className="btns-container">
            <input type={'submit'} className="primary-btn" defaultValue="search" onClick={props.handleSubmit}/>
          </div>
        </form>
      </div>
    </div>
  )
}

const {
  array,
  string, 
  bool,
  func
} = PropTypes

SearchForm.propTypes = {
  candidatesAsOptions: array.isRequired,
  searchError: bool.isRequired,
  isDisplaying: bool.isRequired,
  candidateId: string,
  handleSubmit: func.isRequired,
  handleOptionClick: func.isRequired,
  handleInputChange: func.isRequired,
}

SearchForm.defaultProps = {
  candidatesAsOptions: []
}

export default SearchForm