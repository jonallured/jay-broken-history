import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { JayUtils } from "../../shared/JayUtils"

export default class List extends Command {
  static description = "list users in safelist"

  async run(): Promise<void> {
    const { safelistFilePath } = Jay.instance.config
    const existingData = JayUtils.readFile(safelistFilePath)
    this.log(existingData)
  }
}
