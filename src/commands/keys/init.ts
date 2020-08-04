import { Command } from "@oclif/command"
import { JayUtils } from "../../shared/JayUtils"
import { Jay } from "../../shared/Jay"

export default class Init extends Command {
  static description = "make directory structure and symlink"

  async run(): Promise<void> {
    const {
      keysDir,
      keysFilePath,
      safelistFilePath,
      symlinkPath,
      unmanagedFilePath,
    } = Jay.instance.config

    JayUtils.mkdir(keysDir)

    const paths: string[] = [safelistFilePath, keysFilePath, unmanagedFilePath]

    paths.forEach((path) => {
      JayUtils.writeFile(path, "")
    })

    if (!JayUtils.fileExists(symlinkPath)) {
      JayUtils.symlink(keysFilePath, symlinkPath)
    }
  }
}
