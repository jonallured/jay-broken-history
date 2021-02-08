export const computeBranchName = (
  featureName: string,
  featureType: string
): string => {
  const cleanedName = featureName.replace(/[^a-zA-Z ]/g, "")
  const parts = [featureType, ...cleanedName.split(" ")]
  const branchName = parts.join("-").toLowerCase()
  return branchName
}

export const computeGithubTeamNames = (githubTeams: string[]): string[] => {
  const githubTeamNames = githubTeams.map((name) => `@${name}`)
  return githubTeamNames
}

const baseJiraURL = "https://artsyproduct.atlassian.net/browse/"

export const computeJiraLinks = (jiraTickets: string[]): string[] => {
  const links = jiraTickets.map((ticket) => [baseJiraURL, ticket].join(""))
  return links
}

export const placeholderPrBody =
  "This is a placeholder - please update with an awesome PR description!"

export const computePrBody = (
  jiraLinks: string[],
  githubTeamNames: string[]
): string => {
  const tickets = jiraLinks.join("\n")
  const mentions =
    githubTeamNames.length > 0 && `/cc ${githubTeamNames.join(" ")}`
  const body = [placeholderPrBody, tickets, mentions]
    .filter(Boolean)
    .join("\n\n")
  return body
}

export const computePrTitle = (
  featureName: string,
  featureType: string,
  jiraTickets: string[]
): string => {
  const prefix = `${featureType}:`
  const suffix = jiraTickets[0]

  const parts = [prefix, featureName, suffix].filter(Boolean)
  const title = parts.join(" ")

  return title
}
