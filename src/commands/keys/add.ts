import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { updateSafelist } from "../../helpers/keys"

export default class Add extends Command {
  static description = "add a user to the safelist (then update)"

  static strict = false

  async run(): Promise<void> {
    const appendList = this.parse(Add).argv
    updateSafelist(Jay.config, appendList, [])
  }
}
