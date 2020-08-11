import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"

export default class List extends Command {
  static description = "list users in safelist"

  async run(): Promise<void> {
    const { safelistFilePath } = Jay.config
    const existingData = Jay.utils.readFile(safelistFilePath)
    this.log(existingData)
  }
}
