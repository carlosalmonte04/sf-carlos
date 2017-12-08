const initialState = {
  'candidates': {},
  'companies': {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_COMPANIES_ON_STATE':
      return Object.assign({}, state, { 'companies': action.payload })
    case 'SET_CANDIDATES_ON_STATE':
      return Object.assign({}, state, { 'candidates': action.payload })
    default:
      return state
  }
}