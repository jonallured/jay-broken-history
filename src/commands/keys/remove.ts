import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { updateSafelist } from "../../helpers/keys"

export default class Remove extends Command {
  static description = "remove a user from the safelist (then update)"

  static strict = false

  async run(): Promise<void> {
    const removeList = this.parse(Remove).argv

    if (removeList.length > 0) {
      updateSafelist(Jay.config, [], removeList)
    }
  }
}
