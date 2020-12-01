import { Command, flags } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import {
  computeBranchName,
  computeGithubTeamNames,
  computeJiraLinks,
  computePrTitle,
} from "../../helpers/feature"

const artsyTeams = [
  "artsy/collector-experience",
  "artsy/fx-devs",
  "artsy/grow-devs",
  "artsy/purchase-devs",
  "artsy/px-devs",
]

const featureTypes = [
  "chore",
  "docs",
  "feat",
  "fix",
  "refactor",
  "style",
  "test",
]

const nameArg = {
  description: "Name of the feature being worked.",
  name: "featureName",
  required: true,
}

const typeArg = {
  default: "feat",
  description: "Type of the feature being worked.",
  name: "featureType",
  options: featureTypes,
  required: true,
}

const jiraFlag = flags.string({
  char: "j",
  default: [],
  description: "Jira ticket number like this: GRO-4.",
  multiple: true,
  required: false,
})

const teamFlag = flags.string({
  char: "t",
  default: [],
  description: "GitHub team to CC on PR.",
  multiple: true,
  options: artsyTeams,
  required: false,
})

export default class Start extends Command {
  static description = "Start a feature branch."

  static args = [nameArg, typeArg]

  static flags = {
    jira: jiraFlag,
    team: teamFlag,
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(Start)

    const { featureName, featureType } = args
    const { jira: jiraTickets, team: githubTeams } = flags

    const branchName = computeBranchName(featureName, featureType)
    const prTitle = computePrTitle(featureName, featureType)

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
