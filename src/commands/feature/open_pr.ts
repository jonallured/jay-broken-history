import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"

const computePrBody = (
  jiraLinks: string[],
  githubTeamNames: string[]
): string => {
  const placeholder =
    "This is a placeholder - please update with an awesome PR description!"
  const tickets = jiraLinks.join("\n")
  const mentions =
    githubTeamNames.length > 0 && `/cc ${githubTeamNames.join(" ")}`
  const body = [placeholder, tickets, mentions].filter(Boolean).join("\n\n")
  return body
}

export default class OpenPr extends Command {
  static description = "Open PR on upstream from feature branch."

  async run(): Promise<void> {
    const currentBranchCommand = "git branch --show-current"
    const branchName = Jay.utils.exec(currentBranchCommand)

    const getDescriptionCommand = `git config --get branch.${branchName}.description`
    const branchDescription = Jay.utils.exec(getDescriptionCommand)
    const branchInfo = JSON.parse(branchDescription)
    const { githubTeamNames, jiraLinks, prTitle } = branchInfo

    const renameBranchCommand = `git branch -m jonallured/${branchName}`
    Jay.utils.exec(renameBranchCommand)

    const pushCommand = `git push --set-upstream upstream HEAD`
    Jay.utils.exec(pushCommand)

    const prBody = computePrBody(jiraLinks, githubTeamNames)
    const prCommand = `gh pr create --title '${prTitle}' --body '${prBody}' --web`
    Jay.utils.exec(prCommand)
  }
}
