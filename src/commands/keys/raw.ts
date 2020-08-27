import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { addRawKey } from "../../helpers/keys"

export default class Raw extends Command {
  static description = "add a raw key to the unmanaged list (then update)"

  static strict = false

  async run(): Promise<void> {
    const rawPath: string = this.parse(Raw).argv[0]
    addRawKey(Jay.config, rawPath)
  }
}
