import Add from "../../../src/commands/keys/add"
import { mockKeysHelper } from "../../helpers"

describe("Add", () => {
  it("does nothing with an empty list", async () => {
    const mockHelper = mockKeysHelper("updateSafelist")
    await Add.run([])
    expect(mockHelper).not.toHaveBeenCalled()
  })

  it("adds a single user", async () => {
    const mockHelper = mockKeysHelper("updateSafelist")

    await Add.run(["jonallured"])

    expect(mockHelper).toHaveBeenCalledTimes(1)
    const call = mockHelper.mock.calls[0]
    const [_config, appendList, _removeList] = call
    expect(appendList).toEqual(["jonallured"])
  })

  it("adds a few users", async () => {
    const mockHelper = mockKeysHelper("updateSafelist")

    await Add.run(["jonallured", "orta", "pepopowitz"])

    expect(mockHelper).toHaveBeenCalledTimes(1)
    const call = mockHelper.mock.calls[0]
    const [_config, appendList, _removeList] = call
    expect(appendList).toEqual(["jonallured", "orta", "pepopowitz"])
  })
})
