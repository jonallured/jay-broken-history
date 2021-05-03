import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"

const branchNameArg = {
  description: "Name of branch to be nuked.",
  name: "branchName",
  required: true,
}

export default class Nuke extends Command {
  static description = "Nuke a feature branch."

  static args = [branchNameArg]

  async run(): Promise<void> {
    const { branchName } = this.parse(Nuke).args

    const localCommand = `git branch -D ${branchName} || echo nope`
    Jay.utils.exec(localCommand)

    const upstreamCommand = `git push upstream --delete ${branchName} || echo nope`
    Jay.utils.exec(upstreamCommand)

    const originBranchName = branchName.split("/").pop()
    const originCommand = `git push origin --delete ${originBranchName} || echo nope`
    Jay.utils.exec(originCommand)
  }
}
