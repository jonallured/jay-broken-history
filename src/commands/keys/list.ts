import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { readSafelist } from "../../helpers/keys"

export default class List extends Command {
  static description = "list users in safelist"

  async run(): Promise<void> {
    const existingData = readSafelist(Jay.config)
    this.log(existingData)
  }
}
