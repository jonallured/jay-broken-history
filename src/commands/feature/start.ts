import { Command, flags } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import {
  computeBranchName,
  computeJiraLinks,
  computePrTitle,
} from "../../helpers/feature"

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

export default class Start extends Command {
  static description = "Start a feature branch."

  static args = [nameArg, typeArg]

  static flags = {
    jira: jiraFlag,
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(Start)

    const { featureName, featureType } = args
    const { jira: jiraTickets } = flags

    const branchName = computeBranchName(featureName, featureType)
    const prTitle = computePrTitle(featureName, featureType, jiraTickets)

    const jiraLinks = computeJiraLinks(jiraTickets)

    const newBranchCommand = `git checkout -b ${branchName}`
    Jay.utils.exec(newBranchCommand)

    const pushCommand = `git push --set-upstream origin ${branchName}`
    Jay.utils.exec(pushCommand)

    const branchInfo = {
      jiraLinks,
      prTitle,
    }
    const branchDescription = JSON.stringify(branchInfo)
    const setDescriptionCommand = `git config branch.${branchName}.description '${branchDescription}'`
    Jay.utils.exec(setDescriptionCommand)
  }
}
