
export default function getPercentile(candidate, candidates, companies) {
  const candidateCompany   = companies[candidate['companyId']]
  
  const similarCompaniesIds = []
  const similarPeers = []

  for (const company in companies) {
    if (Math.abs(candidateCompany["fractalIndex"] - companies[company]["fractalIndex"]) < 0.15) {
      similarCompaniesIds.push(company)
    }
  }

  for (const similarCandidateId in candidates) {
    const similarCandidate = candidates[similarCandidateId]
    if (similarCompaniesIds.includes(similarCandidate.companyId) //same title + in similar company?
        && similarCandidate.title === candidate.title) {
      similarPeers.push(similarCandidate) // push to similarPeers
    }
  }

  const sortedByCodingSkills = similarPeers.sort((a, b) => parseInt(a.codingScore) - parseInt(b.codingScore))
  const codingPercentileLocation = sortedByCodingSkills.indexOf(candidate)

  const sortedByCommSkills = similarPeers.sort((a, b) => parseInt(a.communicationScore) - parseInt(b.communicationScore))
  const communicationPercentileLocation = sortedByCommSkills.indexOf(candidate)

  const codingPercentile = (codingPercentileLocation + 1 / similarPeers.length)
  const communicationPercentile = (communicationPercentileLocation + 1 / similarPeers.length)

  return {
    coding: codingPercentile,
    communication: communicationPercentile
  }

}
