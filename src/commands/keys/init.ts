import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { initKeys, updateKeys } from "../../helpers/keys"

export default class Init extends Command {
  static description = "make directory structure and symlink"

  async run(): Promise<void> {
    initKeys(Jay.config)
    updateKeys(Jay.config)
  }
}
