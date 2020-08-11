import { Hook } from "@oclif/config"
import { JayConfig } from "../shared/JayConfig"

const initHook: Hook<"init"> = async () => {
  JayConfig.init()
}

export default initHook
