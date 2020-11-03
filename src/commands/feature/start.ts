import { Command, flags } from "@oclif/command"
import { Jay } from "../../shared/Jay"

const computeGithubTeamNames = (githubTeams: string[]): string[] => {
  const githubTeamNames = githubTeams.map((name) => `@${name}`)
  return githubTeamNames
}

const artsyTeams = [
  "artsy/collector-experience",
  "artsy/fx-devs",
  "artsy/grow-devs",
  "artsy/purchase-devs",
  "artsy/px-devs",
]

const computeJiraLinks = (jiraTickets: string[]): string[] => {
  const links = jiraTickets.map(
    (ticket) => `https://artsyproduct.atlassian.net/browse/${ticket}`
  )
  return links
}

const computeBranchName = (
  featureName: string,
  featureType: string
): string => {
  const parts = [featureType, ...featureName.split(" ")]
  const branchName = parts.join("-").toLowerCase()
  return branchName
}

const computePRTitle = (featureName: string, featureType: string): string => {
  const prTitle = [featureType, featureName].join(": ")
  return prTitle
}

const featureTypes = [
  "chore",
  "docs",
  "feat",
  "fix",
  "refactor",
  "style",
  "test",
]

export default class Start extends Command {
  static description = "Start a feature branch."

  static args = [
    {
      name: "featureName",
      required: true,
      description: "Name of the feature being worked.",
    },
    {
      name: "featureType",
      required: true,
      description: "Type of the feature being worked.",
      default: "feat",
      options: featureTypes,
    },
  ]

  static flags = {
    jira: flags.string({
      char: "j",
      default: [],
      description: "Jira ticket number like this: GRO-4.",
      multiple: true,
      required: false,
    }),
    team: flags.string({
      char: "t",
      default: [],
      description: "GitHub team to CC on PR.",
      multiple: true,
      options: artsyTeams,
      required: false,
    }),
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(Start)

    const { featureName, featureType } = args
    const { jira: jiraTickets, team: githubTeams } = flags

    const branchName = computeBranchName(featureName, featureType)
    const prTitle = computePRTitle(featureName, featureType)

    const jiraLinks = computeJiraLinks(jiraTickets)
    const githubTeamNames = computeGithubTeamNames(githubTeams)

    const newBranchCommand = `git checkout -b ${branchName}`
    Jay.utils.exec(newBranchCommand)

    const pushCommand = `git push --set-upstream origin ${branchName}`
    Jay.utils.exec(pushCommand)

    const branchInfo = {
      githubTeamNames,
      jiraLinks,
      prTitle,
    }
    const branchDescription = JSON.stringify(branchInfo)
    const setDescriptionCommand = `git config branch.${branchName}.description '${branchDescription}'`
    Jay.utils.exec(setDescriptionCommand)
  }
}
