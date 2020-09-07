import { execSync } from "child_process"
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  symlinkSync,
  writeFileSync,
} from "fs"
import { homedir, hostname } from "os"
import fetch from "node-fetch"

const exec = (command: string): string => {
  const result = execSync(command, { encoding: "utf-8" })
  return result.trim()
}

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url)
  const body = await response.text()
  return body
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

const readFile = (path: string): string => {
  return readFileSync(path, { encoding: "utf-8" })
}

const symlink = (path: string, symlinkPath: string): void => {
  symlinkSync(path, symlinkPath)
}

const symlinkExists = (path: string): boolean => {
  try {
    const stats = lstatSync(path)
    return stats.isSymbolicLink()
  } catch {
    return false
  }
}

const writeFile = (path: string, data: string): void => {
  writeFileSync(path, data)
}

export const JayUtils = {
  exec,
  fetchText,
  fileExists,
  getHomedir,
  getHostname,
  mkdir,
  readFile,
  symlink,
  symlinkExists,
  writeFile,
}
