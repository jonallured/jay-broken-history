import Remove from "../../../src/commands/keys/remove"
import * as keysHelper from "../../../src/helpers/keys"

type HelperName = keyof typeof keysHelper

const mockKeysHelper = (helperName: HelperName) => {
  const mockHelper = jest.fn()
  jest.spyOn(keysHelper, helperName).mockImplementation(mockHelper)
  return mockHelper
}

describe("Remove", () => {
  it("does nothing with an empty list", async () => {
    const mockHelper = mockKeysHelper("updateSafelist")
    await Remove.run([])
    expect(mockHelper).not.toHaveBeenCalled()
  })

  it("removes a single user", async () => {
    const mockHelper = mockKeysHelper("updateSafelist")

    await Remove.run(["jonallured"])

    expect(mockHelper).toHaveBeenCalledTimes(1)
    const call = mockHelper.mock.calls[0]
    const [_config, _appendList, removeList] = call
    expect(removeList).toEqual(["jonallured"])
  })

  it("removes a few users", async () => {
    const mockHelper = mockKeysHelper("updateSafelist")

    await Remove.run(["jonallured", "orta", "pepopowitz"])

    expect(mockHelper).toHaveBeenCalledTimes(1)
    const call = mockHelper.mock.calls[0]
    const [_config, _appendList, removeList] = call
    expect(removeList).toEqual(["jonallured", "orta", "pepopowitz"])
  })
})
