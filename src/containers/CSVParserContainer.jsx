import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSVSearch from '../components/CSVSearch.jsx'
import CSVResults from '../components/CSVResults.jsx'
import fetchCSV from '../actions/fetchCSV'

class CSVParserContainer extends Component {
  state = {
    isSearchFormDisplaying: true,
    csvName: '',
    parseError: false,
  }

  handleCsvParse = async (e, CSVUrl, CSVType) => {
    e.preventDefault()
    const isResponseValid = await this.props.fetchCSV(CSVUrl, CSVType)
    if (isResponseValid) {
      this.setState({isSearchFormDisplaying: false})
      setTimeout(() => {
        this.setState({
          isSearchFormDisplaying: true
        })
      }, 2000)
    } else {
      this.setState({
        parseError: true
      })
      setTimeout(() => {
        this.setState({
          parseError: false
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
    console.log("this.props.CSVType", this.props.CSVType)
    return (
      <div className={`csv-parser-container ${this.props.csvType === 'companies' ? 'right' : 'left'}`}>
        <CSVSearch  CSVType={this.props.CSVType} parseError={this.state.parseError} isDisplaying={this.state.isSearchFormDisplaying} csvType={this.props.csvType} handleCsvParse={this.handleCsvParse} />
        <CSVResults isDisplaying={!this.state.isSearchFormDisplaying} csvType={this.props.csvType} handleCsvParse={this.handleCsvParse} handleSearchAgain={this.handleSearchAgain}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCSV: (CSVUrl, CSVType) => dispatch(fetchCSV(CSVUrl, CSVType))
  }
}

export default connect(null, mapDispatchToProps)(CSVParserContainer)