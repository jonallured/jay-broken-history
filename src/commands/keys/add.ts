import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"
import { computeSafelist } from "../../helpers/keys"

export default class Add extends Command {
  static description = "add a user to the safelist (then update)"

  static strict = false

  async run(): Promise<void> {
    const { safelistFilePath } = Jay.config

    const appendList = this.parse(Add).argv

    const existingData = Jay.utils.readFile(safelistFilePath)
    const initialList = existingData.split("\n")

    const safeList = computeSafelist({
      appendList,
      initialList,
      removeList: [],
    })
    const data = safeList.join("\n")

    Jay.utils.writeFile(safelistFilePath, data)
  }
}
