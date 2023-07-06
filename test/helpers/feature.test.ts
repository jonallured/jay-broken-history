import {
  computeBranchName,
  computeJiraLinks,
  computePrBody,
  computePrTitle,
  placeholderPrBody,
  teamMention,
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
  describe("with no jira links", () => {
    it("returns the placeholder pr body and team mention", () => {
      const jiraLinks: string[] = []
      const body = computePrBody(jiraLinks)
      expect(body).toContain(placeholderPrBody)
      expect(body).toContain(teamMention)
    })
  })

  describe("with some jira links", () => {
    it("adds those links to the body", () => {
      const jiraLinks = [
        "https://artsyproduct.atlassian.net/browse/GRO-4",
        "https://artsyproduct.atlassian.net/browse/CX-7",
      ]
      const body = computePrBody(jiraLinks)
      expect(body).toContain(jiraLinks[0])
      expect(body).toContain(jiraLinks[1])
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
