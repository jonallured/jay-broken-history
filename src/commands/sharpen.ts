import { Command } from "@oclif/command"
import * as moment from "moment"
import { hostname as getHostName } from "os"
import { exec } from "child_process"

export const computeSharpenIssueUrl = (
  weekNumber: number,
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
    const weekNumber = moment().week()
    const hostname = getHostName().split(".")[0]

    const newIssueUrl = computeSharpenIssueUrl(weekNumber, hostname)
    const command = `open "${newIssueUrl}"`

    exec(command)
  }
}
