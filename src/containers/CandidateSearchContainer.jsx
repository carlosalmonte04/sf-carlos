import React, { Component } from 'react'
import { connect } from 'react-redux'
import CandidateSearch from '../components/CandidateSearch.jsx'
import CandidateResults from '../components/CandidateResults.jsx'

import getPercentiles from '../helpers/getPercentiles'


class CandidateSearchContainer extends Component {

  state = {
    isSearchFormDisplaying: true,
    candidateId: '',
    searchError: false,
    candidatesAsOptions: this.props.candidatesIds,
    codingPercentile: 0,
    communicationPercentile: 0
  }

  handleOptionClick = (e) => {
    this.setState({ candidateId: e.target.id }, () => this.handleSearchSubmit(e))
  }

  handleInputChange = (e) => {
    const candidateIdInput = e.target.value
    this.setState({ 
      candidateId: candidateIdInput,
      candidatesAsOptions: this.props.candidatesIds.filter(candidateId => candidateId.includes(candidateIdInput))
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault()
    const { candidateId } = this.state
    const { candidates, companies } = this.props
    const candidate = candidates[candidateId]
    if (candidate) {
      const percentiles = getPercentiles(candidate, candidates, companies)

      this.setState({
        codingPercentile: percentiles.coding,
        communicationPercentile: percentiles.communication
      })

      this.setState({
        isSearchFormDisplaying: false
      })
    } else {
      this.setState({
        searchError: true
      })
      setTimeout(() => {
        this.setState({
          searchError: false
        })
      }, 2000)
    }
  }

  handleSearchAgain = (e) => {
    e.preventDefault()
    this.setState({
      isSearchFormDisplaying: true,
      candidateid: '',
      searchError: false
    })
  }

  render() {
    return (
      <div>
        <div className="form-container">
          <div className="box3d-container" >
            <div className="title-container custom">
              <h1 className={`title custom boxed-search-form-title ${this.state.isSearchFormDisplaying ? '' : 'away'}`} >Search</h1>
              <h1 className={`title custom boxed-search-results-title ${!this.state.isSearchFormDisplaying ? '' : 'away'}`} >Results</h1>
            </div>
            <div className="animated fadeIn">
              <CandidateSearch  
                isDisplaying={this.state.isSearchFormDisplaying} 
                searchError={this.state.searchError} 
                candidatesAsOptions={this.state.candidatesAsOptions} 
                handleSubmit={this.handleSearchSubmit} 
                handleInputChange={this.handleInputChange} 
                handleOptionClick={this.handleOptionClick} 
                candidateId={this.state.candidateId}/>
              <CandidateResults 
                isDisplaying={!this.state.isSearchFormDisplaying} 
                codingPercentile={this.state.codingPercentile} 
                communicationPercentile={this.state.communicationPercentile}
                handleSearchAgain={this.handleSearchAgain} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    candidates: state.candidates,
    companies: state.companies,
    candidatesIds: Object.keys(state.candidates)
  }
}

export default connect(mapStateToProps)(CandidateSearchContainer)
