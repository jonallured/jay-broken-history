jay
===



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/jonallured/jay/tree/master.svg?style=shield)](https://circleci.com/gh/jonallured/jay/tree/master)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jay
$ jay COMMAND
running command...
$ jay (-v|--version|version)
jay/0.0.0 darwin-x64 node-v8.1.4
$ jay --help [COMMAND]
USAGE
  $ jay COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jay hello [FILE]`](#jay-hello-file)
* [`jay help [COMMAND]`](#jay-help-command)

## `jay hello [FILE]`

describe the command here

```
USAGE
  $ jay hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ jay hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/jonallured/jay/blob/v0.0.0/src/commands/hello.ts)_

## `jay help [COMMAND]`

display help for jay

```
USAGE
  $ jay help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_
<!-- commandsstop -->
