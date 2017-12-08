import React, { Component } from 'react'
import { connect } from 'react-redux'
import CandidateSearch from '../components/CandidateSearch.jsx'
import CandidateResults from '../components/CandidateResults.jsx'


class CandidateSearchContainer extends Component {

  state = {
    isSearchFormDisplaying: true,
    candidateId: '',
    searchError: false,
    candidatesAsOptions: this.props.candidatesIds,
    codingPercentile: 0,
    communicationPercentile: 0
  }

  componentWillReceiveProps(nextProps) {
    if(this.props == nextProps) {
      console.log("hello")
    } 
      console.log("hello not the same")
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
    const { candidates } = this.props
    const candidate = this.props.candidates[candidateId]
    const candidateCompany   = this.props.companies[candidate['companyId']]
    const { companies } = this.props
    
    const similarCompaniesIds = []
    const similarPeers = []

    for (const company in companies) {
      if (Math.abs(candidateCompany["fractalIndex"] - companies[company]["fractalIndex"]) < 0.15) {
        similarCompaniesIds.push(company)
      }
    }

    for (const similarCandidateId in candidates) {
      const similarCandidate = candidates[similarCandidateId]
      if (similarCompaniesIds.includes(similarCandidate.companyId)
          && similarCandidate.title === candidate.title) {
        similarPeers.push(similarCandidate)
      }
    }

    const codingSorted = similarPeers.sort((a, b) => parseInt(a.codingScore) - parseInt(b.codingScore))
    const codingIdx = codingSorted.indexOf(candidate)

    const communicationSorted = similarPeers.sort((a, b) => parseInt(a.communicationScore) - parseInt(b.communicationScore))
    const communicationIdx = communicationSorted.indexOf(candidate)

    const codingPercentile = (codingIdx + 1 / similarPeers.length)
    const communicationPercentile = (communicationIdx + 1 / similarPeers.length)

    this.setState({
      codingPercentile,
      communicationPercentile
    })

    this.setState({
      isSearchFormDisplaying: false
    })
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
              <CandidateSearch  isShowing={this.state.isSearchFormDisplaying} searchError={this.state.searchError} handleSubmit={this.handleSearchSubmit} handleInputChange={this.handleInputChange} candidatesAsOptions={this.state.candidatesAsOptions} handleOptionClick={this.handleOptionClick} candidateId={this.state.candidateId}/>
              <CandidateResults isShowing={!this.state.isSearchFormDisplaying} handleSearchAgain={this.handleSearchAgain} codingPercentile={this.state.codingPercentile} communicationPercentile={this.state.communicationPercentile}/>
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
