import { Command } from "@oclif/command"
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
    } = Jay.config

    Jay.utils.mkdir(keysDir)

    const paths: string[] = [safelistFilePath, keysFilePath, unmanagedFilePath]

    paths.forEach((path) => {
      Jay.utils.writeFile(path, "")
    })

    if (!Jay.utils.fileExists(symlinkPath)) {
      Jay.utils.symlink(keysFilePath, symlinkPath)
    }
  }
}
