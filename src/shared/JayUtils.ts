import { execSync } from "child_process"
import { existsSync, mkdirSync, symlinkSync, writeFileSync } from "fs"
import { homedir, hostname } from "os"

const exec = (command: string): string => {
  const result = execSync(command, { encoding: "utf-8" })
  return result.trim()
}

const fileExists = (path: string): boolean => {
  return existsSync(path)
}

const getHomedir = (): string => {
  return homedir()
}

const getHostname = (): string => {
  return hostname()
}

const mkdir = (directory: string): string => {
  return mkdirSync(directory, { recursive: true })
}

const symlink = (path: string, symlinkPath: string): void => {
  symlinkSync(path, symlinkPath)
}

const writeFile = (path: string, data: string): void => {
  writeFileSync(path, data)
}

export const JayUtils = {
  exec,
  fileExists,
  getHomedir,
  getHostname,
  mkdir,
  symlink,
  writeFile,
}
