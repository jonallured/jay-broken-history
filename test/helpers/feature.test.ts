import {
  computeBranchName,
  computeGithubTeamNames,
  computeJiraLinks,
  computePrBody,
  computePrTitle,
  placeholderPrBody,
} from "../../src/helpers/feature"

describe("computeBranchName", () => {
  it("appends the type to the feature name", () => {
    const featureName = "Updates"
    const featureType = "chore"

    const branchName = computeBranchName(featureName, featureType)

    expect(branchName).toEqual("chore-updates")
  })

  it("removes case from feature name and replaces spaces with dashes", () => {
    const featureName = "Update list of Repos"
    const featureType = "chore"

    const branchName = computeBranchName(featureName, featureType)

    expect(branchName).toEqual("chore-update-list-of-repos")
  })

  it("removes special characters and numbers", () => {
    const featureName = "This feature rules!1!"
    const featureType = "feat"

    const branchName = computeBranchName(featureName, featureType)

    expect(branchName).toEqual("feat-this-feature-rules")
  })
})

describe("computeGithubTeamNames", () => {
  describe("with an empty array", () => {
    it("returns an empty array", () => {
      const githubTeams: string[] = []
      const githubTeamNames = computeGithubTeamNames(githubTeams)
      expect(githubTeamNames).toEqual([])
    })
  })

  describe("with one team name", () => {
    it("returns that name with @ prepended", () => {
      const githubTeams = ["artsy/grow-devs"]
      const githubTeamNames = computeGithubTeamNames(githubTeams)
      expect(githubTeamNames).toEqual(["@artsy/grow-devs"])
    })
  })

  describe("with a few team names", () => {
    it("returns those names with @ preprended", () => {
      const githubTeams = ["artsy/grow-devs", "artsy/px-devs"]
      const githubTeamNames = computeGithubTeamNames(githubTeams)
      expect(githubTeamNames).toEqual(["@artsy/grow-devs", "@artsy/px-devs"])
    })
  })
})

describe("computeJiraLinks", () => {
  describe("with an empty array", () => {
    it("returns an empty array", () => {
      const jiraTickets: string[] = []
      const links = computeJiraLinks(jiraTickets)
      expect(links).toEqual([])
    })
  })

  describe("with one ticket", () => {
    it("returns that ticket with a full URL", () => {
      const jiraTickets = ["GRO-4"]
      const links = computeJiraLinks(jiraTickets)
      expect(links).toEqual(["https://artsyproduct.atlassian.net/browse/GRO-4"])
    })
  })

  describe("with a few tickets", () => {
    it("returns those tickets with full URLs", () => {
      const jiraTickets = ["GRO-4", "CX-7"]
      const links = computeJiraLinks(jiraTickets)
      expect(links).toEqual([
        "https://artsyproduct.atlassian.net/browse/GRO-4",
        "https://artsyproduct.atlassian.net/browse/CX-7",
      ])
    })
  })
})

describe("computePrBody", () => {
  describe("with no jira links or team names", () => {
    it("returns the placeholder pr body", () => {
      const jiraLinks: string[] = []
      const githubTeamNames: string[] = []
      const body = computePrBody(jiraLinks, githubTeamNames)
      expect(body).toEqual(placeholderPrBody)
    })
  })

  describe("with some jira links", () => {
    it("adds those links to the body", () => {
      const jiraLinks = [
        "https://artsyproduct.atlassian.net/browse/GRO-4",
        "https://artsyproduct.atlassian.net/browse/CX-7",
      ]
      const githubTeamNames: string[] = []
      const body = computePrBody(jiraLinks, githubTeamNames)
      expect(body).toContain(jiraLinks[0])
      expect(body).toContain(jiraLinks[1])
    })
  })

  describe("with some team names", () => {
    it("CCs those team names", () => {
      const jiraLinks: string[] = []
      const githubTeamNames = ["@artsy/grow-devs", "@artsy/px-devs"]
      const body = computePrBody(jiraLinks, githubTeamNames)
      expect(body).toContain("/cc @artsy/grow-devs @artsy/px-devs")
    })
  })
})

describe("computePrTitle", () => {
  it("prepends the type to the feature name", () => {
    const featureName = "Update list of Repos"
    const featureType = "chore"
    const prTitle = computePrTitle(featureName, featureType, [])
    expect(prTitle).toEqual("chore: Update list of Repos")
  })

  it("appends the Jira info to the feature name", () => {
    const featureName = "Update list of Repos"
    const featureType = "chore"
    const jiraTickets = ["GRO-7"]
    const prTitle = computePrTitle(featureName, featureType, jiraTickets)
    expect(prTitle).toEqual("chore: Update list of Repos GRO-7")
  })
})
