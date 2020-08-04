import { Command } from "@oclif/command"
import { JayUtils } from "../shared/JayUtils"

export default class Done extends Command {
  static description = "Announce when things are done."

  async run(): Promise<void> {
    const basenameCommand = "basename `pwd`"
    const basename = JayUtils.exec(basenameCommand)

    const leapCommand = `unicornleap --seconds 1`
    const sayCommand = `say ${basename} done -v Fiona`
    JayUtils.exec(`${sayCommand} & ${leapCommand}`)
  }
}
