import Init from "../../../src/commands/keys/init"
import { mockKeysHelper } from "../../helpers"

describe("Init", () => {
  it("inits and then updates", async () => {
    const mockInitKeys = mockKeysHelper("initKeys")
    const mockUpdateKeys = mockKeysHelper("updateKeys")
    await Init.run([])
    expect(mockInitKeys).toHaveBeenCalled()
    expect(mockUpdateKeys).toHaveBeenCalled()
  })
})
