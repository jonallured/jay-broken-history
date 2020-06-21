import { computeSharpenIssueUrl } from "../../src/commands/sharpen"

describe("computeSharpenIssueUrl", () => {
  it("computes the GH issue url properly", () => {
    const weekNumber = 1
    const hostname = "juggernaut"

    const url = computeSharpenIssueUrl(weekNumber, hostname)

    expect(url).toEqual(
      "https://github.com/jonallured/dotfiles/issues/new?template=sharpen.md&title=Week%201%20-%20juggernaut&labels=sharpen"
    )
  })
})
