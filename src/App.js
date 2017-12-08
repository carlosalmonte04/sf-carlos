import React, { Component } from 'react';
import CSVParserContainer from './containers/CSVParserContainer.jsx'
import CandidateSearchContainer from './containers/CandidateSearchContainer.jsx'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="bg"/>
        <div className="header">
          <CSVParserContainer CSVType='companies' />
          <CSVParserContainer CSVType='score-records' />
        </div>
        <CandidateSearchContainer />
      </div>
    );
  }
}

export default App;
