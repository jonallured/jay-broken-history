import { computeSafelist, SafeListUpdate } from "../../src/helpers/keys"

const defaultUpdate: SafeListUpdate = {
  appendList: [],
  initialList: [],
  removeList: [],
}

describe("computeSafelist", () => {
  it("appends items in the append list", () => {
    const update = {
      ...defaultUpdate,
      appendList: ["orta"],
      initialList: ["jonallured"],
    }

    const safeList = computeSafelist(update)

    expect(safeList).toEqual(["jonallured", "orta"])
  })

  it("sorts list by alpha", () => {
    const update = {
      ...defaultUpdate,
      appendList: ["bbb"],
      initialList: ["aaa", "ccc"],
    }
    const safeList = computeSafelist(update)

    expect(safeList).toEqual(["aaa", "bbb", "ccc"])
  })

  it("filters out empty strings", () => {
    const update = {
      ...defaultUpdate,
      appendList: [""],
      initialList: ["jonallured"],
    }

    const safeList = computeSafelist(update)

    expect(safeList).toEqual(["jonallured"])
  })

  it("filters out items in remove list", () => {
    const update = {
      ...defaultUpdate,
      initialList: ["jonallured", "orta"],
      removeList: ["orta"],
    }

    const safeList = computeSafelist(update)

    expect(safeList).toEqual(["jonallured"])
  })

  it("removes duplicates", () => {
    const update = {
      ...defaultUpdate,
      appendList: ["jonallured"],
      initialList: ["jonallured"],
    }

    const safeList = computeSafelist(update)

    expect(safeList).toEqual(["jonallured"])
  })
})
