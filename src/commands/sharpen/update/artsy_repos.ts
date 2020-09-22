import { Command } from "@oclif/command"
import { Jay } from "../../../shared/Jay"

export default class ArtsyRepos extends Command {
  static description = "Update list of artsy repos."

  async run(): Promise<void> {
    const command = "update_artsy_repos"
    Jay.utils.exec(command)
  }
}
