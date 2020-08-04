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
