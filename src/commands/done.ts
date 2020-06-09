import { Command } from "@oclif/command"
import { exec } from "child_process"

export default class Done extends Command {
  static description = "Announce when things are done."

  async run(): Promise<void> {
    exec("basename `pwd`", (_error, stdout: string) => {
      const basename = stdout.trim()
      const command = `say ${basename} done -v Fiona && unicornleap --seconds 1`
      exec(command)
    })
  }
}
