import { computeIssueParams } from "../../src/commands/sharpen"

describe("computeIssueParams", () => {
  it("computes the issue params properly", () => {
    const weekNumber = "1"
    const hostname = "juggernaut"

    const params = computeIssueParams(weekNumber, hostname)

    expect(params.labels).toEqual(["sharpen"])
    expect(params.owner).toEqual("jonallured")
    expect(params.repo).toEqual("dotfiles")
    expect(params.title).toEqual("Week 1 - juggernaut")
  })
})
