import {Command} from '@oclif/command'

export default class Done extends Command {
  static description = 'Announce when things are done.'

  async run() {
    const {exec} = require('child_process')
    exec('basename `pwd`', (_error: any, stdout: string, _stderr: any) => {
      const basename = stdout.trim()
      const command = `say ${basename} done -v Fiona && unicornleap --seconds 1`
      exec(command)
    })
  }
}
