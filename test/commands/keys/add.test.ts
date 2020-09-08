import Add from "../../../src/commands/keys/add"
import { mockKeysHelper } from "../../helpers"

describe("Add", () => {
  it("does nothing with an empty list", async () => {
    const mockUpdateSafelist = mockKeysHelper("updateSafelist")
    const mockUpdateKeys = mockKeysHelper("updateKeys")
    await Add.run([])
    expect(mockUpdateSafelist).not.toHaveBeenCalled()
    expect(mockUpdateKeys).not.toHaveBeenCalled()
  })

  it("adds a single user", async () => {
    const mockUpdateSafelist = mockKeysHelper("updateSafelist")
    const mockUpdateKeys = mockKeysHelper("updateKeys")

    await Add.run(["jonallured"])

    expect(mockUpdateSafelist).toHaveBeenCalledTimes(1)
    const call = mockUpdateSafelist.mock.calls[0]
    const [_config, appendList, _removeList] = call
    expect(appendList).toEqual(["jonallured"])
    expect(mockUpdateKeys).toHaveBeenCalled()
  })

  it("adds a few users", async () => {
    const mockUpdateSafelist = mockKeysHelper("updateSafelist")
    const mockUpdateKeys = mockKeysHelper("updateKeys")

    await Add.run(["jonallured", "orta", "pepopowitz"])

    expect(mockUpdateSafelist).toHaveBeenCalledTimes(1)
    const call = mockUpdateSafelist.mock.calls[0]
    const [_config, appendList, _removeList] = call
    expect(appendList).toEqual(["jonallured", "orta", "pepopowitz"])
    expect(mockUpdateKeys).toHaveBeenCalled()
  })
})
