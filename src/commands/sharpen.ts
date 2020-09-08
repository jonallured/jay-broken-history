import { Command } from "@oclif/command"
import { Jay } from "../shared/Jay"

export const computeSharpenIssueUrl = (
  weekNumber: string,
  hostname: string
): string => {
  const issueUrl = "https://github.com/jonallured/dotfiles/issues/new"
  const template = "sharpen.md"
  const label = "sharpen"
  const title = `Week ${weekNumber} - ${hostname}`
  const encodedTitle = encodeURIComponent(title)

  const newIssueUrl = `${issueUrl}?template=${template}&title=${encodedTitle}&labels=${label}`

  return newIssueUrl
}

export default class Sharpen extends Command {
  static description = "Create sharpen ticket for this machine."

  async run(): Promise<void> {
    const weekCommand = "date +%V"
    const weekNumber = Jay.utils.exec(weekCommand)
    const hostname = Jay.utils.getHostname().split(".")[0]

    const newIssueUrl = computeSharpenIssueUrl(weekNumber, hostname)
    const command = `open "${newIssueUrl}"`
    Jay.utils.exec(command)
  }
}
