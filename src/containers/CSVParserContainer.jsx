import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSVSearch from '../components/CSVSearch.jsx'
import CSVResults from '../components/CSVResults.jsx'
import fetchCSV from '../actions/fetchCSV'


const defaultUrls = {
  'companies': 'https://s3.amazonaws.com/simple-fractal-recruiting/companies.csv',
  'score-records': 'https://s3.amazonaws.com/simple-fractal-recruiting/score-records.csv'
}

class CSVParserContainer extends Component {

  state = {
    isSearchFormDisplaying: true,
    CSVUrl: defaultUrls[this.props.CSVType],
    CSVType: this.props.CSVType,
    parseError: false,
    parsedCorrectly: false,
    isLoading: false
  }

  handleCsvParse = async (e) => {
    e.preventDefault()

    this.setState({ isLoading: true })
    
    const { CSVUrl, CSVType } = this.state
    const isResponseValid = await this.props.fetchCSV(CSVUrl, CSVType)
    console.log("isResponseValid", isResponseValid)
    if (isResponseValid) {
      this.setState({ // animate box
        isSearchFormDisplaying: false,
          isLoading: false
      })
      setTimeout(() => {
        this.setState({ // 'deanimate' box
          isSearchFormDisplaying: true,
          parsedCorrectly: true,
        })
      }, 2000)
    } else {
      console.log("error")
      this.setState({ // animate error
        parseError: true,
        isLoading: false
      })
      setTimeout(() => {
        this.setState({ // 'deanimate' error
          parseError: false
        })
      }, 4000)
    }
  }

  handleInputChange = (e) => {
    const CSVUrl = e.target.value
    this.setState({ CSVUrl })
  }

  render() {
    return (
      <div className={`csv-parser-container ${this.props.csvType === 'companies' ? 'right' : 'left'}`}>
        <CSVSearch { ...this.state } handleCsvParse={this.handleCsvParse} handleInputChange={this.handleInputChange} />
        <CSVResults isSearchFormDisplaying={!this.state.isSearchFormDisplaying} />
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