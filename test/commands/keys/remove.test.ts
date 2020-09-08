import Remove from "../../../src/commands/keys/remove"
import { mockKeysHelper } from "../../helpers"

describe("Remove", () => {
  it("does nothing with an empty list", async () => {
    const mockUpdateSafelist = mockKeysHelper("updateSafelist")
    const mockUpdateKeys = mockKeysHelper("updateKeys")
    await Remove.run([])
    expect(mockUpdateSafelist).not.toHaveBeenCalled()
    expect(mockUpdateKeys).not.toHaveBeenCalled()
  })

  it("removes a single user", async () => {
    const mockUpdateSafelist = mockKeysHelper("updateSafelist")
    const mockUpdateKeys = mockKeysHelper("updateKeys")

    await Remove.run(["jonallured"])

    expect(mockUpdateSafelist).toHaveBeenCalledTimes(1)
    const call = mockUpdateSafelist.mock.calls[0]
    const [_config, _appendList, removeList] = call
    expect(removeList).toEqual(["jonallured"])
    expect(mockUpdateKeys).toHaveBeenCalled()
  })

  it("removes a few users", async () => {
    const mockUpdateSafelist = mockKeysHelper("updateSafelist")
    const mockUpdateKeys = mockKeysHelper("updateKeys")

    await Remove.run(["jonallured", "orta", "pepopowitz"])

    expect(mockUpdateSafelist).toHaveBeenCalledTimes(1)
    const call = mockUpdateSafelist.mock.calls[0]
    const [_config, _appendList, removeList] = call
    expect(removeList).toEqual(["jonallured", "orta", "pepopowitz"])
    expect(mockUpdateKeys).toHaveBeenCalled()
  })
})
