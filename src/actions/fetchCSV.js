import setCompaniesInState from './setCompaniesInState'
import setScoreRecordsInState from './setScoreRecordsInState'
export default function fetchCSV(CSVUrl, CSVType) {

  return (dispatch) => {
    const requestParams = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ CSVUrl, CSVType})
    }
    return fetch(process.env.REACT_APP_API_URL + 'csv_parser/', requestParams)
      .catch(err => false)
      .then(res => res.json())
      .catch(err => false)
      .then(data => {
        if (!data.error) {
          CSVType === 'companies' 
            ? dispatch(setCompaniesInState(data))
            : dispatch(setScoreRecordsInState(data))
          return true
        } else {
          return false
        }
      })

  }
}