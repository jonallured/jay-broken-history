import { Jay } from "../shared/Jay"
import { JayConfig } from "../shared/JayConfig"

export interface SafeListUpdate {
  appendList: string[]
  initialList: string[]
  removeList: string[]
}

export const computeSafelist = (update: SafeListUpdate): string[] => {
  const { appendList, initialList, removeList } = update

  const combinedList = initialList.concat(appendList)
  const filteredList = combinedList.filter(
    (item) => item && !removeList.includes(item)
  )
  const sortedList = filteredList.sort()
  const uniqueList = [...new Set(sortedList)]

  return uniqueList
}

export const updateSafelist = (
  config: JayConfig,
  appendList: string[],
  removeList: string[]
): void => {
  const { safelistFilePath } = config
  const existingData = Jay.utils.readFile(safelistFilePath)
  const initialList = existingData.split("\n")

  const safeList = computeSafelist({
    appendList,
    initialList,
    removeList,
  })
  const data = safeList.join("\n")

  Jay.utils.writeFile(safelistFilePath, data)
}

export const initKeys = (config: JayConfig): void => {
  const {
    keysDir,
    keysFilePath,
    safelistFilePath,
    symlinkPath,
    unmanagedFilePath,
  } = config

  Jay.utils.mkdir(keysDir)

  const paths: string[] = [safelistFilePath, keysFilePath, unmanagedFilePath]

  paths.forEach((path) => {
    Jay.utils.writeFile(path, "")
  })

  if (!Jay.utils.fileExists(symlinkPath)) {
    Jay.utils.symlink(keysFilePath, symlinkPath)
  }
}

export const readSafelist = (config: JayConfig): string => {
  const { safelistFilePath } = config
  const existingData = Jay.utils.readFile(safelistFilePath)
  return existingData
}

export const addRawKey = (config: JayConfig, rawPath: string): void => {
  const { unmanagedFilePath } = config

  let unmanagedKeys = Jay.utils.readFile(unmanagedFilePath)
  const newRawKey = Jay.utils.readFile(rawPath)

  unmanagedKeys = [unmanagedKeys, newRawKey].join("\n")

  Jay.utils.writeFile(unmanagedFilePath, unmanagedKeys)
}

export const updateKeys = async (config: JayConfig): Promise<void> => {
  const { keysFilePath, safelistFilePath, unmanagedFilePath } = config
  const safeData = Jay.utils.readFile(safelistFilePath)
  const safeUsernames = safeData.split("\n")

  const promises = safeUsernames.map(async (username) => {
    const url = `https://github.com/${username}.keys`
    return await Jay.utils.fetchText(url)
  })

  const safeKeyData = await Promise.all(promises).then((bodies) => {
    const trimmedBodies = bodies.map((body) => body.trim())
    return trimmedBodies.join("\n")
  })

  const unmanagedData = Jay.utils.readFile(unmanagedFilePath)

  const mergedKeyData = [safeKeyData, unmanagedData]
    .map((data) => data.trim())
    .join("\n")

  Jay.utils.writeFile(keysFilePath, mergedKeyData)
}
