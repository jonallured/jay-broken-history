import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { updateKeys } from "../../helpers/keys"

export default class Update extends Command {
  static description = "update the generated authorized keys file"

  async run(): Promise<void> {
    updateKeys(Jay.config)
  }
}
