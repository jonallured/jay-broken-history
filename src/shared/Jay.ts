import { JayUtils } from "./JayUtils"

interface JayConfig {
  keysDir: string
  keysFilePath: string
  safelistFilePath: string
  sshDir: string
  symlinkPath: string
  unmanagedFilePath: string
}

const sshDir = [JayUtils.getHomedir(), ".ssh"].join("/")
const keysDir = [sshDir, "keys"].join("/")
const keysFilePath = [keysDir, "authorized.keys"].join("/")
const safelistFilePath = [keysDir, "safelist"].join("/")
const symlinkPath = [sshDir, "authorized_keys"].join("/")
const unmanagedFilePath = [keysDir, "unmanaged.keys"].join("/")

const defaultConfig: JayConfig = {
  keysDir,
  keysFilePath,
  safelistFilePath,
  sshDir,
  symlinkPath,
  unmanagedFilePath,
}

export class Jay {
  static instance: Jay

  static init = (config?: JayConfig): Jay => {
    if (Jay.instance) return Jay.instance

    const mergedConfig = {
      ...defaultConfig,
      ...config,
    }

    return new Jay(mergedConfig)
  }

  config: JayConfig

  constructor(config: JayConfig) {
    this.config = config
    Jay.instance = this
  }
}
