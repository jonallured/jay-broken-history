import { computeIssueParams } from "../../../src/commands/sharpen/open"

describe("computeIssueParams", () => {
  it("computes the issue params properly", () => {
    const weekNumber = "1"
    const hostname = "juggernaut"
    const body = "Please sharpen your tools!"

    const params = computeIssueParams(weekNumber, hostname, body)

    expect(params.labels).toEqual(["sharpen"])
    expect(params.owner).toEqual("jonallured")
    expect(params.repo).toEqual("dotfiles")
    expect(params.title).toEqual("Week 1 - juggernaut")
  })
})
