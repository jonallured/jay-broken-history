import { JayUtils } from "./JayUtils"

interface JayConfig {
  sshDir: string
}

const defaultConfig: JayConfig = {
  sshDir: [JayUtils.getHomedir(), ".ssh"].join("/"),
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
