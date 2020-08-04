import { execSync } from "child_process"
import { hostname } from "os"

const exec = (command: string): string => {
  const result = execSync(command, { encoding: "utf-8" })
  return result.trim()
}

const getHostname = (): string => {
  return hostname()
}

export const JayUtils = { exec, getHostname }
