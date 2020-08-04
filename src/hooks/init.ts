import { Hook } from "@oclif/config"
import { Jay } from "../shared/Jay"

const initHook: Hook<"init"> = async () => {
  Jay.init()
}

export default initHook
