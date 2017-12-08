import React from 'react';

const SearchForm = (props) => {

  const defultUrls = {
    'companies': 'https://s3.amazonaws.com/simple-fractal-recruiting/companies.csv',
    'score-records': 'https://s3.amazonaws.com/simple-fractal-recruiting/score-records.csv'
  }

  const { CSVType } = props

  return (
    <div>
      <div className={`search-error-container csv ${props.parseError && props.isDisplaying ? '' : 'away'}`} >
          <span className={`search-error`} >search error</span>
      </div>
      <div className={`form-wrapper boxed-search-form csv ${props.isDisplaying ? '' : 'away'}`}>
        <form id="search-form" className="form csv" >
          <input
            type="text" 
            onChange={props.handleInputChange} 
            placeholder={props.CSVType} 
            defaultValue={defultUrls[CSVType]} 
          />
          <div className="btns-container">
            <input type={'submit'} className="primary-btn" value="parse" onClick={(e) => props.handleCsvParse(e, defultUrls[CSVType], CSVType)}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchForm