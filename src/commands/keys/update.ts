import { Command } from "@oclif/command"
import { Jay } from "../../shared/Jay"

export default class Update extends Command {
  static description = "update the generated authorized keys file"

  async run(): Promise<void> {
    const { keysFilePath, safelistFilePath, unmanagedFilePath } = Jay.config
    const safeData = Jay.utils.readFile(safelistFilePath)
    const safeUsernames = safeData.split("\n")

    const promises = safeUsernames.map(async (username) => {
      const url = `https://github.com/${username}.keys`
      return await Jay.utils.fetchText(url)
    })

    const safeKeyData = await Promise.all(promises).then((bodies) => {
      const trimmedBodies = bodies.map((body) => body.trim())
      return trimmedBodies.join("\n")
    })

    const unmanagedData = Jay.utils.readFile(unmanagedFilePath)

    const mergedKeyData = [safeKeyData, unmanagedData]
      .map((data) => data.trim())
      .join("\n")

    Jay.utils.writeFile(keysFilePath, mergedKeyData)
  }
}
