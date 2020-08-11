import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"

export default class Raw extends Command {
  static description = "add a raw key to the unmanaged list (then update)"

  static strict = false

  async run(): Promise<void> {
    const { unmanagedFilePath } = Jay.config

    const rawPath: string = this.parse(Raw).argv[0]
    this.log(rawPath)

    let unmanagedKeys = Jay.utils.readFile(unmanagedFilePath)
    const newRawKey = Jay.utils.readFile(rawPath)

    unmanagedKeys = [unmanagedKeys, newRawKey].join("\n")

    Jay.utils.writeFile(unmanagedFilePath, unmanagedKeys)
  }
}
