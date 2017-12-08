import React from 'react';

const CSVResults = (props) => {

  function handleSignupBtnClick(e) {
    e.preventDefault()
    props.toggleSearchForm()
  }

  return (
    <div>
      <div className={`search-error-container csv ${props.loginError && props.isDisplaying ? '' : 'away'}`} >
          <span className={`search-error`} >search error</span>
      </div>
      <div className={`form-wrapper boxed-search-results csv ${props.isDisplaying ? '' : 'away'}`}>
        <span>CSV parsed to hash table ⚡️⚡️</span>
      </div>
    </div>
  )
}

export default CSVResults