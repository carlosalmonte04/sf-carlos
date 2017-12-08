import React from 'react';
import PropTypes from 'prop-types'

const SearchForm = (props) => {
  const { candidatesAsOptions } = props
  return (
    <div>
      <div className={`search-error-container ${props.loginError && props.isShowing ? '' : 'away'}`} >
          <span className={`search-error`} >search error</span>
      </div>
      <div className={`form-wrapper boxed-search-form ${props.isShowing ? '' : 'away'}`}>
        <form id="search-form" className="form" >
          <input type={'text'} onChange={props.handleInputChange} required value={props.candidateId} />
          <label>candidate id</label>
          <div>
            <ul className="candidates-as-options">
              {candidatesAsOptions.map(candidateId => <li key={candidateId} id={candidateId} value={candidateId} onClick={props.handleOptionClick}>{candidateId}</li>)}
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

const { array } = PropTypes

SearchForm.propTypes = {
  candidatesAsOptions: array.isRequired
}

SearchForm.defaultProps = {
  candidatesAsOptions: []
}

export default SearchForm