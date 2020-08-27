import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { updateSafelist } from "../../helpers/keys"

export default class Remove extends Command {
  static description = "add a user to the safelist (then update)"

  static strict = false

  async run(): Promise<void> {
    const removeList = this.parse(Remove).argv
    updateSafelist(Jay.config, [], removeList)
  }
}
