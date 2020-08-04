import { execSync } from "child_process"

const exec = (command: string): string => {
  const result = execSync(command, { encoding: "utf-8" })
  return result.trim()
}

export const JayUtils = { exec }
