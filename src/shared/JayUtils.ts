import { execSync } from "child_process"
import { homedir, hostname } from "os"

const exec = (command: string): string => {
  const result = execSync(command, { encoding: "utf-8" })
  return result.trim()
}

const getHomedir = (): string => {
  return homedir()
}

const getHostname = (): string => {
  return hostname()
}

export const JayUtils = { exec, getHomedir, getHostname }
