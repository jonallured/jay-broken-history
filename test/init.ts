import { JayConfig } from "../src/shared/JayConfig"
import * as keysHelpers from "../src/helpers/keys"
import dirTree from "directory-tree"

JayConfig.init()

export type KeysHelpersName = keyof typeof keysHelpers

export const mockKeysHelper = (helperName: KeysHelpersName): jest.Mock => {
  const mockHelper = jest.fn()
  jest.spyOn(keysHelpers, helperName).mockImplementation(mockHelper)
  return mockHelper
}

export const root = process.cwd()

interface Tree {
  type: string
  size: number
  name: string
  children?: Tree[]
}

const cleanTree = (tree: Tree): Tree => {
  const { children, name, size, type } = tree
  const cleaned: Tree = {
    name,
    size,
    type,
  }
  if (children) {
    cleaned.children = children.map((child) => cleanTree(child))
  }
  return cleaned
}

export const captureStructure = (path: string): Tree => {
  const tree = dirTree(path)
  const cleanedTree = cleanTree(tree)
  return cleanedTree
}
