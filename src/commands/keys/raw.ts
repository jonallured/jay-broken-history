import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { JayUtils } from "../../shared/JayUtils"

export default class Raw extends Command {
  static description = "add a raw key to the unmanaged list (then update)"

  static strict = false

  async run(): Promise<void> {
    const { unmanagedFilePath } = Jay.instance.config

    const rawPath: string = this.parse(Raw).argv[0]
    this.log(rawPath)

    let unmanagedKeys = JayUtils.readFile(unmanagedFilePath)
    const newRawKey = JayUtils.readFile(rawPath)

    unmanagedKeys = [unmanagedKeys, newRawKey].join("\n")

    JayUtils.writeFile(unmanagedFilePath, unmanagedKeys)
  }
}
