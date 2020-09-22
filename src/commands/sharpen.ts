import { Octokit } from "@octokit/rest"
import { Endpoints } from "@octokit/types"
import { Command } from "@oclif/command"
import { Jay } from "../shared/Jay"

type CreateRepoIssueParams = Endpoints["POST /repos/:owner/:repo/issues"]["parameters"]
type CreateRepoIssueResponse = Endpoints["POST /repos/:owner/:repo/issues"]["response"]

export const computeIssueParams = (
  weekNumber: string,
  hostname: string
): CreateRepoIssueParams => {
  const templatePath = [
    Jay.config.dotHomePath,
    "/.github/ISSUE_TEMPLATE/sharpen.md",
  ].join("")
  const body = Jay.utils.readFile(templatePath)

  const title = `Week ${weekNumber} - ${hostname}`

  const params = {
    body,
    labels: ["sharpen"],
    owner: "jonallured",
    repo: "dotfiles",
    title,
  }

  return params
}

export default class Sharpen extends Command {
  static description = "Create sharpen ticket for this machine."

  async run(): Promise<void> {
    const gitHubToken = Jay.config.gitHubToken
    const octokit = new Octokit({ auth: gitHubToken })

    const weekCommand = "date +%V"
    const weekNumber = Jay.utils.exec(weekCommand)
    const hostname = Jay.utils.getHostname().split(".")[0]

    const params = computeIssueParams(weekNumber, hostname)

    octokit.issues
      .create(params)
      .then((response: CreateRepoIssueResponse) => {
        const url = response.data.html_url
        const openCommand = `open ${url}`
        Jay.utils.exec(openCommand)
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
